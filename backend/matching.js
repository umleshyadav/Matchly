// Custom matching algorithm logic for TDC Matchmaker

// Education Level Hierarchy
const getEducationLevel = (degree) => {
  const d = degree.toLowerCase();
  if (d.includes('phd') || d.includes('m.tech') || d.includes('mba') || d.includes('m.sc')) return 3;
  if (d.includes('b.tech') || d.includes('mbbs') || d.includes('bds') || d.includes('b.arch')) return 2;
  return 1; // B.A, B.Com, B.Sc, B.Des, etc.
};

// Career/Designation Level Hierarchy
const getCareerLevel = (designation) => {
  const des = designation.toLowerCase();
  if (des.includes('lead') || des.includes('architect') || des.includes('principal') || des.includes('senior') || des.includes('project lead')) return 3;
  if (des.includes('manager') || des.includes('scientist') || des.includes('consultant') || des.includes('analyst')) return 2;
  return 1; // Developer, Engineer, Executive, Associate
};

// Calculate compatibility score between customer and candidate
export const calculateCompatibility = (customer, candidate) => {
  if (customer.gender === candidate.gender) {
    return { score: 0, label: "Low Compatibility", reasons: ["Same gender profiles not matched by default"] };
  }

  let score = 0;
  const reasons = [];
  const isMaleCustomer = customer.gender === 'Male';

  // Helper values
  const customerAge = customer.age;
  const candidateAge = candidate.age;
  const ageDiff = customerAge - candidateAge; // positive if candidate is younger

  // 1. AGE COMPATIBILITY
  if (isMaleCustomer) {
    // Scoring for men looking for women: prefers younger women
    if (ageDiff >= 0 && ageDiff <= 5) {
      score += 15;
      reasons.push("Ideal age difference (candidate is younger by 1-5 years).");
    } else if (ageDiff > 5 && ageDiff <= 10) {
      score += 8;
      reasons.push("Acceptable age difference (candidate is younger by 6-10 years).");
    } else if (ageDiff < 0 && ageDiff >= -3) {
      score += 5; // Slightly older
    }
  } else {
    // Scoring for women looking for men: prefers older or equal age men
    if (ageDiff <= 0 && ageDiff >= -5) {
      score += 10;
      reasons.push("Compatible age difference (candidate is older by 1-5 years).");
    } else if (ageDiff <= -5 && ageDiff >= -10) {
      score += 6;
      reasons.push("Acceptable age range (candidate is older by 6-10 years).");
    } else if (ageDiff > 0 && ageDiff <= 3) {
      score += 5; // Slightly younger
    }
  }

  // 2. HEIGHT COMPATIBILITY
  const heightDiff = customer.height - candidate.height;
  if (isMaleCustomer) {
    // Men looking for women: woman shorter by 5-15cm is ideal
    if (heightDiff >= 5 && heightDiff <= 15) {
      score += 15;
      reasons.push("Good height compatibility (candidate is shorter by 5-15 cm).");
    } else if (heightDiff > 0 && heightDiff < 5) {
      score += 8;
      reasons.push("Close height match (candidate is slightly shorter).");
    } else if (heightDiff > 15 && heightDiff <= 25) {
      score += 6;
    }
  } else {
    // Women looking for men: man taller by 5-20cm is ideal
    if (heightDiff <= -5 && heightDiff >= -20) {
      score += 10;
      reasons.push("Grounded height alignment (candidate is taller by 5-20 cm).");
    } else if (heightDiff < 0 && heightDiff > -5) {
      score += 6;
    }
  }

  // 3. FINANCIAL & INCOME PARITY
  if (isMaleCustomer) {
    // Men looking for women: prefers woman earning less or equal
    if (candidate.income < customer.income) {
      score += 15;
      reasons.push("Compatible financial bracket (candidate income is lower than client).");
    } else if (candidate.income === customer.income) {
      score += 8;
      reasons.push("Equal earning brackets.");
    }
  } else {
    // Women looking for men: prefers similar or higher earning man
    if (candidate.income >= customer.income) {
      score += 15;
      reasons.push("Strong financial stability (candidate earns equal or more).");
    } else if (candidate.income >= customer.income * 0.8) {
      score += 8;
      reasons.push("Acceptable income parity (candidate earns close to client).");
    }
  }

  // 4. EDUCATION & CAREER (Mainly prioritized for Female Customers)
  if (!isMaleCustomer) {
    const custEdu = getEducationLevel(customer.degree);
    const candEdu = getEducationLevel(candidate.degree);
    if (candEdu >= custEdu) {
      score += 10;
      reasons.push("Strong educational compatibility (candidate has similar/higher education).");
    } else if (candEdu === custEdu - 1) {
      score += 5;
    }

    const custCareer = getCareerLevel(customer.designation);
    const candCareer = getCareerLevel(candidate.designation);
    if (candCareer >= custCareer) {
      score += 10;
      reasons.push("Designation level compatibility match (candidate is in solid career track).");
    } else if (candCareer === custCareer - 1) {
      score += 5;
    }
  }

  // 5. MARITAL STATUS
  if (customer.maritalStatus === candidate.maritalStatus) {
    score += 10;
    reasons.push(`Compatible marital status match (both are ${customer.maritalStatus}).`);
  } else if (customer.maritalStatus === 'Single' && candidate.maritalStatus !== 'Single') {
    score += 2;
  } else {
    score += 6;
  }

  // 6. RELIGION & CASTE
  if (customer.religion === candidate.religion) {
    score += 15;
    reasons.push(`Aligned cultural background (both identify as ${customer.religion}).`);
    
    // Check caste if same religion
    if (customer.caste === candidate.caste && customer.caste !== 'None') {
      score += 5;
      reasons.push(`Caste alignment (${customer.caste} community).`);
    }
  } else if (customer.religion === 'Other' || candidate.religion === 'Other') {
    score += 7;
  }

  // 7. LOCATION & RELOCATION
  if (customer.city === candidate.city) {
    score += 15;
    reasons.push(`Geographically compatible (both reside in ${customer.city}).`);
  } else {
    // Relocation checks
    const custRelocate = customer.openToRelocate === 'Yes';
    const candRelocate = candidate.openToRelocate === 'Yes';
    
    if (custRelocate || candRelocate) {
      score += 10;
      reasons.push("Relocation comfort: at least one client is willing to relocate.");
    } else if (customer.openToRelocate === 'Maybe' || candidate.openToRelocate === 'Maybe') {
      score += 5;
    }
  }

  // 8. LIFESTYLE (Diet, Smoking, Drinking)
  let lifestylePoints = 0;
  if (customer.dietPreference === candidate.dietPreference) {
    lifestylePoints += 5;
  }
  if (customer.smokingHabits === candidate.smokingHabits) {
    lifestylePoints += 5;
  }
  if (customer.drinkingHabits === candidate.drinkingHabits) {
    lifestylePoints += 5;
  }
  
  if (lifestylePoints >= 10) {
    reasons.push("Highly aligned lifestyle habits (diet, drinking, and smoking).");
  }
  score += lifestylePoints;

  // 9. KIDS & PETS COMPATIBILITY (Under preferences for Females / general)
  if (!isMaleCustomer) {
    if (customer.wantKids === candidate.wantKids) {
      score += 5;
      if (customer.wantKids === 'Yes') reasons.push("Aligned on future family planning and children goals.");
    }
    if (customer.openToPets === candidate.openToPets && customer.openToPets === 'Yes') {
      score += 5;
      reasons.push("Compatible pet lovers.");
    }
  } else {
    if (customer.wantKids === candidate.wantKids && customer.wantKids === 'Yes') {
      score += 5;
    }
  }

  // 10. HOBBIES & LANGUAGES OVERLAP
  const sharedHobbies = customer.hobbies.filter(h => candidate.hobbies.includes(h));
  if (sharedHobbies.length > 0) {
    score += 5;
    reasons.push(`Shared hobby interest in ${sharedHobbies[0]} offers a natural icebreaker.`);
  }

  const sharedLangs = customer.languagesKnown.filter(l => candidate.languagesKnown.includes(l) && l !== 'English');
  if (sharedLangs.length > 0) {
    score += 5;
    reasons.push(`Regional language connection (both speak ${sharedLangs[0]}).`);
  }

  // Normalize final score to max out at 98, min 45
  const finalScore = Math.max(45, Math.min(98, score));

  // Determine Compatibility label
  let label = "Low Compatibility";
  if (finalScore >= 85) label = "High Potential";
  else if (finalScore >= 70) label = "Good Match";
  else if (finalScore >= 55) label = "Possible Match";

  return {
    score: finalScore,
    label,
    reasons: reasons.slice(0, 3) // Return top 3 reasons
  };
};

// Export getTopMatches function
export const getTopMatches = (customerProfile, allProfiles) => {
  // Filter for opposite gender
  const oppositeGenderCandidates = allProfiles.filter(p => p.gender !== customerProfile.gender && p.id !== customerProfile.id);

  const scoredCandidates = oppositeGenderCandidates.map(candidate => {
    const analysis = calculateCompatibility(customerProfile, candidate);
    return {
      client: candidate,
      scorePct: analysis.score,
      label: analysis.label,
      reasons: analysis.reasons,
      aiExplanation: analysis.reasons[0] || "Complementary career and location profiles."
    };
  });

  // Sort descending by score
  return scoredCandidates.sort((a, b) => b.scorePct - a.scorePct).slice(0, 10);
};
