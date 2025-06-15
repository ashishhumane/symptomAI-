const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    fullName: String,
    email: String,
    location: String,
    gender: String,
    specialty: String,
    symptoms: {
        type: Array,
        default: []
    }
})

const Doctor = mongoose.model('Doctor', doctorSchema);

(async () => {
    try {
        const count = await Doctor.countDocuments({});
        if (count === 0) {
            await Doctor.insertMany([
                {
                    fullName: "Dr. Asha Mehta",
                    email: "asha.mehta@example.com",
                    location: "Mumbai",
                    gender: "Female",
                    specialty: "Cardiology",
                    symptoms: ["chest pain", "shortness of breath", "palpitations"]
                },
                {
                    fullName: "Dr. Rajesh Khanna",
                    email: "rajesh.khanna@example.com",
                    location: "Pune",
                    gender: "Male",
                    specialty: "Dermatology",
                    symptoms: ["acne", "rashes", "skin allergy"]
                },
                {
                    fullName: "Dr. Neha Sharma",
                    email: "neha.sharma@example.com",
                    location: "Delhi",
                    gender: "Female",
                    specialty: "Neurology",
                    symptoms: ["headache", "seizures", "dizziness"]
                },
                {
                    fullName: "Dr. Vivek Patil",
                    email: "vivek.patil@example.com",
                    location: "Bangalore",
                    gender: "Male",
                    specialty: "Pediatrics",
                    symptoms: ["fever", "cough", "diarrhea"]
                },
                {
                    fullName: "Dr. Anjali Desai",
                    email: "anjali.desai@example.com",
                    location: "Hyderabad",
                    gender: "Female",
                    specialty: "Gastroenterology",
                    symptoms: ["abdominal pain", "constipation", "indigestion"]
                },
                {
                    fullName: "Dr. Imran Khan",
                    email: "imran.khan@example.com",
                    location: "Ahmedabad",
                    gender: "Male",
                    specialty: "Psychiatry",
                    symptoms: ["anxiety", "depression", "insomnia"]
                },
                {
                    fullName: "Dr. Sneha Verma",
                    email: "sneha.verma@example.com",
                    location: "Kolkata",
                    gender: "Female",
                    specialty: "Pulmonology",
                    symptoms: ["cough", "breathing difficulty", "asthma"]
                },
                {
                    fullName: "Dr. Karan Sethi",
                    email: "karan.sethi@example.com",
                    location: "Chennai",
                    gender: "Male",
                    specialty: "Orthopedics",
                    symptoms: ["joint pain", "fracture", "back pain"]
                },
                {
                    fullName: "Dr. Priya Gupta",
                    email: "priya.gupta@example.com",
                    location: "Mumbai",
                    gender: "Female",
                    specialty: "Endocrinology",
                    symptoms: ["diabetes", "thyroid issues", "weight gain"]
                },
                {
                    fullName: "Dr. Rakesh Singh",
                    email: "rakesh.singh@example.com",
                    location: "Delhi",
                    gender: "Male",
                    specialty: "Oncology",
                    symptoms: ["cancer", "tumors", "fatigue"]
                },
                {
                    fullName: "Dr. Smita Rao",
                    email: "smita.rao@example.com",
                    location: "Pune",
                    gender: "Female",
                    specialty: "Psychiatry",
                    symptoms: ["depression", "bipolar disorder", "stress"]
                },
                {
                    fullName: "Dr. Arjun Patel",
                    email: "arjun.patel@example.com",
                    location: "Ahmedabad",
                    gender: "Male",
                    specialty: "Neurology",
                    symptoms: ["migraine", "memory loss", "numbness"]
                },
                {
                    fullName: "Dr. Kavita Joshi",
                    email: "kavita.joshi@example.com",
                    location: "Bangalore",
                    gender: "Female",
                    specialty: "Dermatology",
                    symptoms: ["eczema", "psoriasis", "hair loss"]
                },
                {
                    fullName: "Dr. Deepak Verma",
                    email: "deepak.verma@example.com",
                    location: "Chennai",
                    gender: "Male",
                    specialty: "Cardiology",
                    symptoms: ["arrhythmia", "high blood pressure", "chest discomfort,chest pain"]
                },
                {
                    fullName: "Dr. Ritu Singh",
                    email: "ritu.singh@example.com",
                    location: "Hyderabad",
                    gender: "Female",
                    specialty: "Pediatrics",
                    symptoms: ["growth issues", "allergies", "immunization"]
                }
            ]);
            console.log("Sample doctors inserted.");
        }
    } catch (err) {
        console.error("Error inserting sample doctors:", err);
    }
})();



module.exports = Doctor;