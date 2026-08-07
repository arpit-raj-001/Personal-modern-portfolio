import React, { useState, useMemo } from "react";
import "./CodingProfiles.css";
import { useTheme } from "../../contexts/ThemeContext";

export default function Heatmap({ data }) {
  const { theme } = useTheme();
  const [hoveredMonth, setHoveredMonth] = useState(null);

  const { days, months } = useMemo(() => {
    const daysArr = [];
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 364);

    const dayOfWeek = start.getDay();
    start.setDate(start.getDate() - dayOfWeek);

    const monthLabels = [];
    let currentMonth = -1;

    for (let i = 0; i < 371; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);

      if (d > today) break;

      const dateStr = d.toISOString().split("T")[0];
      const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const count = data[dateStr] || 0;

      let level = 0;
      if (count > 0) level = 1;
      if (count > 2) level = 2;
      if (count > 4) level = 3;
      if (count > 6) level = 4;

      daysArr.push({
        date: dateStr,
        month: monthStr,
        count,
        level,
        dayObj: d,
      });

      if (d.getMonth() !== currentMonth && d.getDate() < 15) {
        monthLabels.push({
          label: d.toLocaleString("default", { month: "short" }),
          index: Math.floor(i / 7),
        });
        currentMonth = d.getMonth();
      }
    }

    return { days: daysArr, months: monthLabels };
  }, [data]);

  return (
    <div className="heatmap-container">
      <div className="heatmap-months">
        {months.map((m, i) => (
          <span
            key={i}
            className="heatmap-month-label"
            style={{ gridColumn: m.index + 1 }}
          >
            {m.label}
          </span>
        ))}
      </div>

      <div className="heatmap-grid" onMouseLeave={() => setHoveredMonth(null)}>
        {days.map((day, i) => {
          const isHovered = hoveredMonth === day.month;
          const levelClass = isHovered
            ? `color-green-${day.level}`
            : `color-grey-${day.level}`;

          return (
            <div
              key={day.date}
              className={`heatmap-cell ${levelClass}`}
              title={`${day.count} submissions on ${day.date}`}
              onMouseEnter={() => setHoveredMonth(day.month)}
              data-month={day.month}
            />
          );
        })}
      </div>

      <div className="heatmap-legend">
        <span>Less</span>
        <div className={`heatmap-cell color-grey-0`} />
        <div className={`heatmap-cell color-grey-1`} />
        <div className={`heatmap-cell color-grey-2`} />
        <div className={`heatmap-cell color-grey-3`} />
        <div className={`heatmap-cell color-grey-4`} />
        <span>More</span>
      </div>
    </div>
  );
}
