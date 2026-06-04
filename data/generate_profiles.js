import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data pools for generating realistic profiles
const femaleFirstNames = [
  "Aaradhya", "Ananya", "Diya", "Ishita", "Kavya", "Meera", "Neha", "Pooja", "Riya", "Shruti", 
  "Tanvi", "Aditi", "Sneha", "Priyanka", "Riddhi", "Aisha", "Zara", "Fatima", "Priya", "Divya", 
  "Deepika", "Ritu", "Sunita", "Geeta", "Simran", "Harpreet", "Jaspreet", "Gurpreet", "Preeti", "Shreya", 
  "Kriti", "Kiara", "Sonam", "Alia", "Janhvi", "Khushi", "Anjali", "Swati", "Rashmi", "Namrata", 
  "Sakshi", "Shalini", "Nikita", "Mansi", "Payal", "Komal", "Kajal", "Barkha", "Nidhi", "Tanya", 
  "Sonal", "Pallavi", "Rupa", "Hina", "Sana", "Farah", "Mariam", "Alisha", "Amrita", "Kiran"
];

const maleFirstNames = [
  "Aarav", "Aditya", "Arjun", "Dev", "Ishan", "Kabir", "Rohan", "Siddharth", "Vihaan", "Vivaan", 
  "Amit", "Rahul", "Abhishek", "Sandeep", "Manoj", "Vikram", "Deepak", "Rajesh", "Suresh", "Harish", 
  "Sunil", "Anil", "Jasbir", "Gurdeep", "Manpreet", "Satish", "Rakesh", "Manish", "Pawan", "Nitin", 
  "Gaurav", "Saurabh", "Sumit", "Nikhil", "Varun", "Kunal", "Rohit", "Virat", "Hardik", "Shubman", 
  "Shreyas", "Rishabh", "Yash", "Pranav", "Aniket", "Chinmay", "Sameer", "Ajay", "Sanjay", "Madhav"
];

const lastNames = [
  "Sharma", "Verma", "Gupta", "Patel", "Mehta", "Joshi", "Shah", "Nair", "Iyer", "Iyengar", 
  "Rao", "Reddy", "Choudhury", "Banerjee", "Chatterjee", "Mukherjee", "Sen", "Ghosh", "Das", "Roy", 
  "Kapoor", "Khan", "Sheikh", "Syed", "Gill", "Singh", "Sodhi", "Ahluwalia", "Grewal", "Dhillon", 
  "Malhotra", "Khanna", "Anand", "Bhatia", "Chawla", "Grover", "Bajaj", "Goel", "Bansal", "Singhal", 
  "Mittal", "Aggarwal", "Kulkarni", "Deshpande", "Patil", "Deshmukh", "More", "Shinde", "Jadhav", "Sawant"
];

const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"];

const colleges = [
  "IIT Bombay", "IIT Delhi", "IIT Madras", "BITS Pilani", "Delhi University", "St. Xavier's College", 
  "H.R. College of Commerce", "NMIMS Bangalore", "Christ University", "VIT Vellore", 
  "College of Engineering Pune", "Jadavpur University", "Osmania University", "IIIT Hyderabad", 
  "Anna University", "NIT Trichy", "Symbiosis International", "SRM University", "Manipal Institute", "SRCC Delhi"
];

const degrees = [
  "B.Tech Computer Science", "B.Tech Mechanical", "B.E. Electronics", "B.Com Honors", "B.A. Economics", 
  "M.Tech Computer Science", "MBA Finance", "MBA Marketing", "M.Sc Data Science", "B.Sc Physics",
  "B.Des UX Design", "MBBS", "BDS Dentistry", "B.A. English Literature", "B.Arch Architecture"
];

const companies = [
  "TCS", "Infosys", "Wipro", "HCLTech", "Tech Mahindra", "Google India", "Microsoft India", 
  "Amazon India", "Flipkart", "Zomato", "Paytm", "Razorpay", "Tata Motors", "Reliance Industries", 
  "HDFC Bank", "ICICI Bank", "McKinsey & Company", "Deloitte India", "EY India", "PwC India"
];

const designations = [
  "Software Engineer", "Senior Developer", "Product Manager", "Data Scientist", "Financial Analyst", 
  "Management Consultant", "UX Designer", "Business Analyst", "Marketing Manager", "HR Generalist", 
  "Mechanical Design Engineer", "Operations Executive", "Investment Associate", "Systems Architect", "Project Lead"
];

const hobbiesList = [
  "Cooking", "Hiking", "Photography", "Reading", "Cricket", "Yoga", "Gardening", "Traveling", "Painting", 
  "Guitar", "Documentaries", "Board Games", "Running", "Biking", "Baking", "Dancing", "Singing", "Volunteering"
];

const castes = [
  "Brahmin", "Khatri", "Gupta", "Agarwal", "Bania", "Patel", "Reddy", "Nair", "Iyer", "Iyengar", 
  "Maratha", "Kayastha", "Arora", "Sikh Jat", "Jain Oswal", "Lohana", "None"
];

const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Other"];

const languages = ["Hindi", "English", "Bengali", "Marathi", "Telugu", "Tamil", "Gujarati", "Kannada", "Punjabi", "Malayalam"];

const statuses = ["Active", "On Hold", "Matched"];

// Helper to choose random item from array
const randChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper to get multiple unique items from array
const randSample = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

// Helper to get random number in range
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate realistic 2-3 line bio
const generateAboutMe = (gender, occupation, city, hobbies, diet) => {
  const isFemale = gender === "Female";
  const pronoun = isFemale ? "She" : "He";
  const posPronoun = isFemale ? "her" : "his";
  
  const line1 = `Passionate and driven ${occupation} currently thriving in the bustling city of ${city}.`;
  
  const line2 = `In ${posPronoun} free time, you'll find ${isFemale ? 'her' : 'him'} enjoying ${hobbies[0].toLowerCase()} and ${hobbies[1].toLowerCase()}.`;
  
  const line3 = `Raised with values that blend traditional warmth and modern outlooks. Prefers a healthy ${diet.toLowerCase()} lifestyle.`;
  
  return `${line1} ${line2} ${line3}`;
};

// Generate YYYY-MM-DD Date of Birth (Ages 24 to 38)
const generateDOB = () => {
  const age = randInt(24, 38);
  const year = 2026 - age;
  const month = String(randInt(1, 12)).padStart(2, '0');
  const day = String(randInt(1, 28)).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const generateProfiles = () => {
  const profiles = [];
  
  // Total target is at least 100: let's generate exactly 100 profiles
  // Mix: 60 females, 40 males
  const countFemales = 60;
  const countMales = 40;
  
  const generateOne = (idNum, gender) => {
    const isFemale = gender === "Female";
    const firstName = isFemale ? randChoice(femaleFirstNames) : randChoice(maleFirstNames);
    const lastName = randChoice(lastNames);
    const city = randChoice(cities);
    const height = isFemale ? randInt(150, 172) : randInt(165, 190);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${idNum}@gmail.com`;
    const phone = `+91 ${randInt(7, 9)}${String(randInt(0, 999999999)).padStart(9, '0')}`;
    const college = randChoice(colleges);
    const degree = randChoice(degrees);
    const income = randInt(6, 80); // In lakhs
    const company = randChoice(companies);
    const designation = randChoice(designations);
    const maritalStatus = randChoice(["Single", "Single", "Single", "Single", "Divorced", "Widowed"]); // Skew to single
    
    // Choose languages: English + local language
    const languagesKnown = ["English", "Hindi"];
    if (city === "Kolkata") languagesKnown.push("Bengali");
    if (city === "Mumbai" || city === "Pune") languagesKnown.push("Marathi");
    if (city === "Hyderabad") languagesKnown.push("Telugu");
    if (city === "Chennai") languagesKnown.push("Tamil");
    if (city === "Bangalore") languagesKnown.push("Kannada");
    if (city === "Ahmedabad") languagesKnown.push("Gujarati");
    // Deduplicate
    const uniqueLanguages = [...new Set(languagesKnown)];
    
    const siblings = randInt(0, 3);
    const religion = randChoice(religions);
    
    // Caste mapping matching religion
    let caste = "None";
    if (religion === "Hindu") {
      caste = randChoice(castes.filter(c => c !== "Sikh Jat" && c !== "Jain Oswal"));
    } else if (religion === "Sikh") {
      caste = "Sikh Jat";
    } else if (religion === "Jain") {
      caste = "Jain Oswal";
    }
    
    const wantKids = randChoice(["Yes", "No", "Maybe"]);
    const openToRelocate = randChoice(["Yes", "No", "Maybe"]);
    const openToPets = randChoice(["Yes", "No", "Maybe"]);
    const hobbies = randSample(hobbiesList, 3);
    const dietPreference = randChoice(["Vegetarian", "Non-Vegetarian", "Non-Vegetarian", "Vegan"]); // Skew to Non-Veg
    const smokingHabits = randChoice(["Never", "Never", "Occasionally", "Regularly"]);
    const drinkingHabits = randChoice(["Never", "Occasionally", "Occasionally", "Regularly"]);
    const familyType = randChoice(["Nuclear", "Joint"]);
    const manglik = randChoice(["No", "No", "Yes", "Don't Know"]);
    const profileStatus = randChoice(statuses);
    const assignedMatchmakerId = `matchmaker_${randInt(1, 3)}`;
    const aboutMe = generateAboutMe(gender, designation, city, hobbies, dietPreference);
    
    return {
      id: `ind_${idNum}`,
      firstName,
      lastName,
      gender,
      dateOfBirth: generateDOB(),
      country: "India",
      city,
      height,
      email,
      phone,
      undergraduateCollege: college,
      degree,
      income,
      currentCompany: company,
      designation,
      maritalStatus,
      languagesKnown: uniqueLanguages,
      siblings,
      caste,
      religion,
      wantKids,
      openToRelocate,
      openToPets,
      hobbies,
      dietPreference,
      smokingHabits,
      drinkingHabits,
      familyType,
      manglik,
      profileStatus,
      assignedMatchmakerId,
      profilePhoto: "",
      aboutMe
    };
  };

  // Generate 60 Females
  for (let i = 1; i <= countFemales; i++) {
    profiles.push(generateOne(i, "Female"));
  }
  // Generate 40 Males
  for (let i = 1; i <= countMales; i++) {
    profiles.push(generateOne(countFemales + i, "Male"));
  }

  // Shuffle profiles array
  const shuffled = profiles.sort(() => 0.5 - Math.random());

  const targetPath = path.join(__dirname, 'profiles.json');
  fs.writeFileSync(targetPath, JSON.stringify(shuffled, null, 2), 'utf8');
  console.log(`Successfully generated ${shuffled.length} Indian profiles at ${targetPath}`);
};

generateProfiles();
