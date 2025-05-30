export const weddingData = {
  couple: {
    name: "Sarah & Mike",
    engagementDate: "December 10, 2023",
    photoUrl: "https://images.pexels.com/photos/1439261/pexels-photo-1439261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  wedding: {
    date: "June 15, 2025",
    location: "Los Angeles, CA",
    venue: "The Garden Estate",
    style: "Modern",
    guestCount: 150,
    timeRemaining: {
      days: 0,
      months: 0,
      years: 0
    }
  },
  budget: {
    total: 45000,
    spent: 18500,
    remaining: 26500,
    categories: [
      { name: "Venue", allocated: 18000, spent: 15000, percentage: 83 },
      { name: "Catering", allocated: 13500, spent: 0, percentage: 0 },
      { name: "Photography", allocated: 6750, spent: 2500, percentage: 37 },
      { name: "Flowers", allocated: 3600, spent: 1000, percentage: 28 },
      { name: "Music", allocated: 3150, spent: 0, percentage: 0 }
    ],
    expenses: [
      {
        id: 1,
        category: "Venue",
        amount: 15000,
        vendorName: "The Garden Estate",
        date: "2024-02-15",
        description: "Venue deposit and first payment"
      },
      {
        id: 2,
        category: "Photography",
        amount: 2500,
        vendorName: "Capture Moments Photography",
        date: "2024-03-01",
        description: "Photography package deposit"
      },
      {
        id: 3,
        category: "Flowers",
        amount: 1000,
        vendorName: "Blooming Beautiful",
        date: "2024-03-10",
        description: "Flower arrangement deposit"
      }
    ]
  },
  timeline: [
    {
      title: "12+ Months Before",
      status: "completed",
      tasks: [
        { id: 1, name: "Set wedding date", completed: true, dueDate: "2024-01-15" },
        { id: 2, name: "Create initial budget", completed: true, dueDate: "2024-01-20" },
        { id: 3, name: "Book ceremony venue", completed: true, dueDate: "2024-01-30", cost: 15000, vendor: "Grand Ballroom" }
      ]
    },
    {
      title: "9-12 Months Before",
      status: "completed",
      tasks: [
        { id: 4, name: "Book reception venue", completed: true, dueDate: "2024-02-15", cost: 15000, vendor: "Grand Ballroom" },
        { id: 5, name: "Hire photographer", completed: true, dueDate: "2024-02-28", cost: 2500, vendor: "Emma Photos" },
        { id: 6, name: "Book caterer", completed: false, dueDate: "2024-03-15", inProgress: true }
      ]
    },
    {
      title: "6-9 Months Before",
      status: "current",
      tasks: [
        { id: 7, name: "Send save-the-dates", completed: false, dueDate: "2024-04-01", inProgress: true, dueInDays: 14 },
        { id: 8, name: "Book florist", completed: false, dueDate: "2024-04-15" },
        { id: 9, name: "Choose wedding cake", completed: false, dueDate: "2024-04-30" },
        { id: 10, name: "Book transportation", completed: false, dueDate: "2024-05-15" }
      ]
    },
    {
      title: "3-6 Months Before",
      status: "upcoming",
      tasks: [
        { id: 11, name: "Send wedding invitations", completed: false, dueDate: "2024-06-15" },
        { id: 12, name: "Plan rehearsal dinner", completed: false, dueDate: "2024-06-30" },
        { id: 13, name: "Book hair/makeup", completed: false, dueDate: "2024-07-15" },
        { id: 14, name: "Final dress fitting", completed: false, dueDate: "2024-07-30" }
      ]
    },
    {
      title: "1-3 Months Before",
      status: "upcoming",
      tasks: [
        { id: 15, name: "Confirm final headcount", completed: false, dueDate: "2024-08-15" },
        { id: 16, name: "Create seating chart", completed: false, dueDate: "2024-08-30" },
        { id: 17, name: "Pack for honeymoon", completed: false, dueDate: "2024-09-10" }
      ]
    }
  ]
};

// Calculate time remaining until wedding date
export const calculateTimeRemaining = () => {
  const weddingDate = new Date("June 15, 2025");
  const currentDate = new Date();
  
  // Calculate difference in milliseconds
  const difference = weddingDate.getTime() - currentDate.getTime();
  
  // Calculate years, months, and days
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor(difference / millisecondsPerDay);
  
  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays - (years * 365);
  const months = Math.floor(remainingDaysAfterYears / 30);
  const days = remainingDaysAfterYears - (months * 30);
  
  return {
    years,
    months,
    days,
    totalDays
  };
};

// Update wedding data with time remaining
weddingData.wedding.timeRemaining = calculateTimeRemaining();

export default weddingData;