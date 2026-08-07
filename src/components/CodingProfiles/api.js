export const fetchCodeforcesStats = async (handle) => {
  try {
    const [infoRes, statusRes, ratingRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
      fetch(`https://codeforces.com/api/user.status?handle=${handle}`),
      fetch(`https://codeforces.com/api/user.rating?handle=${handle}`)
    ]);
    
    const infoData = await infoRes.json();
    if (infoData.status !== "OK") throw new Error("CF API failed");

    const statusData = await statusRes.json();
    if (statusData.status !== "OK") throw new Error("CF Status API failed");
    
    const ratingData = await ratingRes.json();

    
    const heatmap = {};
    let totalSolved = 0;
    const solvedSet = new Set();
    
    statusData.result.forEach(sub => {
      if (sub.verdict === "OK") {
        if (!solvedSet.has(sub.problem.name)) {
          solvedSet.add(sub.problem.name);
          totalSolved++;
        }
        
        
        const date = new Date(sub.creationTimeSeconds * 1000);
        const dateStr = date.toISOString().split('T')[0]; 
        heatmap[dateStr] = (heatmap[dateStr] || 0) + 1;
      }
    });

    const user = infoData.result[0];

    const ratingHistory = [];
    if (ratingData.status === "OK" && ratingData.result) {
      ratingData.result.forEach(contest => {
        ratingHistory.push({
          name: contest.contestName.length > 20 ? contest.contestName.substring(0, 20) + "..." : contest.contestName,
          rating: contest.newRating
        });
      });
    }

    return {
      success: true,
      data: {
        platform: "Codeforces",
        solved: totalSolved,
        rating: user.rating || 0,
        maxRating: user.maxRating || 0,
        rank: user.rank || "Unrated",
        heatmap,
        ratingHistory: ratingHistory.length > 0 ? ratingHistory : null
      }
    };
  } catch (err) {
    console.error("Codeforces live fetch failed, using fallback.", err);
    return getFallbackData("Codeforces");
  }
};

export const fetchLeetCodeStats = async (username) => {
  try {
    const profileRes = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`);
    const profileData = await profileRes.json();
    if (profileData.errors) throw new Error("LC API failed");

    let contestData = null;
    try {
      const contestRes = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`);
      if (contestRes.ok) {
        contestData = await contestRes.json();
      }
    } catch (e) {
      console.warn("LC Contest API failed or rate limited", e);
    }

    
    const heatmap = {};
    if (profileData.submissionCalendar) {
      const calendarObj = typeof profileData.submissionCalendar === 'string' 
        ? JSON.parse(profileData.submissionCalendar) 
        : profileData.submissionCalendar;

      Object.entries(calendarObj).forEach(([timestampStr, count]) => {
        const date = new Date(parseInt(timestampStr) * 1000);
        const dateStr = date.toISOString().split('T')[0];
        heatmap[dateStr] = (heatmap[dateStr] || 0) + count;
      });
    }

    let maxRating = 0;
    const ratingHistory = [];
    if (contestData && contestData.contestParticipation) {
      contestData.contestParticipation.forEach(contest => {
        const r = Math.round(contest.rating);
        if (r > maxRating) maxRating = r;
        ratingHistory.push({
          name: contest.contest?.title ? (contest.contest.title.length > 20 ? contest.contest.title.substring(0, 20) + "..." : contest.contest.title) : "Contest",
          rating: r
        });
      });
    }

    return {
      success: true,
      data: {
        platform: "LeetCode",
        solved: profileData.totalSolved || 0,
        rating: Math.round((contestData && contestData.contestRating) || profileData.contributionPoint || 0),
        maxRating: maxRating > 0 ? maxRating : (profileData.ranking || 0),
        rank: "Knight",
        heatmap,
        ratingHistory: ratingHistory.length > 0 ? ratingHistory : null
      }
    };
  } catch (err) {
    console.error("LeetCode live fetch failed, using fallback.", err);
    return getFallbackData("LeetCode");
  }
};

export const fetchCodeChefStats = async (username) => {
  //hardcoded
  const heatmap = {};
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    if (Math.random() > 0.7) {
      heatmap[dateStr] = Math.floor(Math.random() * 5) + 1;
    }
  }

  const ratingHistory = [];
  let current = 1400;
  for (let i = 10; i >= 0; i--) {
    
    let fluctuation = (Math.random() * 80) - 30; 
    let stepRating = current + fluctuation;
    
    
    if (i !== 0) {
       stepRating = Math.min(stepRating, 1600);
    }
    
    ratingHistory.push({
      name: `Contest ${11-i}`,
      rating: Math.round(stepRating)
    });
    current += (1605 - 1400) / 10;
  }
  
  ratingHistory[ratingHistory.length - 1].rating = 1605;

  return {
    success: true,
    data: {
      platform: "CodeChef",
      solved: 420,
      rating: 1605,
      maxRating: 1605,
      rank: "3 Star",
      heatmap,
      ratingHistory
    }
  };
};

const getFallbackData = (platform) => {
  
  const heatmap = {};
  const today = new Date();
  
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    
    if (Math.random() > 0.7) {
      heatmap[dateStr] = Math.floor(Math.random() * 5) + 1;
    }
  }

  const fallbacks = {
    "Codeforces": {
      platform: "Codeforces",
      solved: 843,
      rating: 1542,
      maxRating: 1680,
      rank: "Specialist",
      heatmap,
    },
    "LeetCode": {
      platform: "LeetCode",
      solved: 512,
      rating: 1820,
      maxRating: 1950,
      rank: "Knight",
      heatmap,
    },
    "CodeChef": {
      platform: "CodeChef",
      solved: 420,
      rating: 1745,
      maxRating: 1800,
      rank: "4 Star",
      heatmap,
    }
  };

  return {
    success: false,
    data: fallbacks[platform]
  };
};
