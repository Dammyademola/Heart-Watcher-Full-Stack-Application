//Enviroment
require('dotenv').config();

//Express.JS
const express = require("express");
const app = express();

//Database
const cors = require("cors");
const mysql = require("mysql");

//Encryption
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

//Prediction Models
const tf = require("@tensorflow/tfjs-node");
const path = require("path");

//Requests
const axios = require("axios");


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MIN_CONFIDENCE_THRESHOLD = 0.8;
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.use(express.json());


//User registeration
app.post("/api/register", async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    email,
    password,
    formattedDateOfBirth,
    height,
    weight,
    gender,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      user_id: id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword,
      date_of_birth: formattedDateOfBirth,
      height: height,
      weight: weight,
      gender: gender,
    };

    connection.query("INSERT INTO user SET ?", userData, (err, results) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Error registering user" });
      } else {
        console.log("User registered successfully");
        res.status(200).json({ message: "User registered successfully" });
      }
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Error hashing password" });
  }
});

//Updating CHF Medical Data
app.post("/api/update-chf-medical/:userId", async (req, res) => {
  const userId = req.params.userId;
  const {
    systolic,
    diastolic,
    cholesterol_stage,
    glucose,
    smoke,
    alcohol,
    active,
  } = req.body;

  try {
    connection.query(
      "UPDATE chf SET systolic = ?, diastolic = ?, cholesterol_stage = ?, glucose = ?, smoke = ?, alcohol = ?, active = ? WHERE user_id = ?",
      [
        systolic,
        diastolic,
        cholesterol_stage,
        glucose,
        smoke,
        alcohol,
        active,
        userId,
      ],
      (err, results) => {
        if (err) {
          console.error("Error updating user's medical details:", err);
          res
            .status(500)
            .json({ error: "Error updating user's medical details" });
        } else {
          console.log("User's medical details updated successfully");
          res
            .status(200)
            .json({ message: "User's medical details updated successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error updating user's medical details:", error);
    res.status(500).json({ error: "Error updating user's medical details" });
  }
});

//Updating MI Medical Data
app.post("/api/update-mi-medical/:userId", async (req, res) => {
  const userId = req.params.userId;
  const {
    chest_pain,
    resting_bp,
    cholesterol_level,
    fasting_blood_sugar,
    rest_ecg,
    max_heart_rate,
    exercise_induced_angina,
    slope,
    num_major_vessels,
    thalium_stress_test,
    oldpeak,
  } = req.body;

  try {
    connection.query(
      "UPDATE mi SET chest_pain = ?, resting_bp = ?, cholesterol_level = ?, fasting_blood_sugar = ?, rest_ecg = ?, max_heart_rate = ?, exercise_induced_angina = ?, slope = ?, num_major_vessels = ?, thalium_stress_test = ?, oldpeak = ? WHERE user_id = ?",
      [
        chest_pain,
        resting_bp,
        cholesterol_level,
        fasting_blood_sugar,
        rest_ecg,
        max_heart_rate,
        exercise_induced_angina,
        slope,
        num_major_vessels,
        thalium_stress_test,
        oldpeak,
        userId,
      ],
      (err, results) => {
        if (err) {
          console.error("Error updating user's medical details:", err);
          res
            .status(500)
            .json({ error: "Error updating user's medical details" });
        } else {
          console.log("User's medical details updated successfully");
          res
            .status(200)
            .json({ message: "User's medical details updated successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error updating user's medical details:", error);
    res.status(500).json({ error: "Error updating user's medical details" });
  }
});

//User personal records update
app.post("/api/update-personal/:userId", async (req, res) => {
  const userId = req.params.userId;
  const {
    firstName,
    lastName,
    email,
    formattedDateOfBirth,
    height,
    weight,
    gender,
  } = req.body;

  try {
    connection.query(
      "UPDATE user SET first_name = ?, last_name = ?, email = ?, date_of_birth = ?, height = ?, weight = ?, gender = ? WHERE user_id = ?",
      [
        firstName,
        lastName,
        email,
        formattedDateOfBirth,
        height,
        weight,
        gender,
        userId,
      ],
      (err, results) => {
        if (err) {
          console.error("Error updating user details:", err);
          res.status(500).json({ error: "Error updating user details" });
        } else {
          console.log("User details updated successfully");
          res
            .status(200)
            .json({ message: "User details updated successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Error updating user details" });
  }
});

//User password record update
app.post("/api/update-personal-password/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    connection.query(
      "UPDATE user SET password = ? WHERE user_id = ?",
      [hashedPassword, userId],
      (err, results) => {
        if (err) {
          console.error("Error updating user password:", err);
          res.status(500).json({ error: "Error updating user password" });
        } else {
          console.log("User password updated successfully");
          res
            .status(200)
            .json({ message: "User password updated successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).json({ error: "Error updating user password" });
  }
});

//User Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    connection.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Error querying user:", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          if (results.length === 0) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
          }

          const user = results[0];
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
          }

          const token = generateToken(user.user_id);
          console.log("User successfully Log In");
          res.status(200).json({ userId: user.user_id, token });
        }
      }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

function generateToken(userId) {
  const token = jwt.sign({ userId }, "heartattackapp", { expiresIn: "1h" });
  return token;
}

module.exports = generateToken;

//Get a users record
app.get("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;

  try {
    connection.query(
      "SELECT * FROM user WHERE user_id = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Error querying user records:", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          if (results.length === 0) {
            res.status(404).json({ error: "User not found" });
            return;
          }
          console.log("User records retrieved successfully");
          res.status(200).json(results);
        }
      }
    );
  } catch (error) {
    console.error("Error fetching user records:", error);
    res.status(500).json({ error: "Error fetching user records" });
  }
});

//Check if a user has personal record
app.get("/api/check-details/:userId", (req, res) => {
  const userId = req.params.userId;

  try {
    connection.query(
      "SELECT * FROM user WHERE user_id = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Error querying user records:", err);
          res.status(500).send({ error: "Error querying user records" });
          return;
        }

        if (results.length === 0) {
          console.log("No user records found");
          res.status(404).send({ error: "No user records found" });
          return;
        }

        console.log("User records found successfully");
        res.status(200).send({ userDetails: results });
      }
    );
  } catch (error) {
    console.error("Error fetching user records:", error);
    res.status(500).send({ error: "Error fetching user records" });
  }
});

//Check if a user has medical record
app.get("/api/check-medical-details/:userId", (req, res) => {
  const userId = req.params.userId;

  try {
    connection.query(
      "SELECT * FROM chf JOIN mi ON chf.user_id = mi.user_id WHERE chf.user_id = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Error querying user medical records:", err);
          res.status(500).send({ error: "Error querying user records" });
          return;
        }

        if (results.length === 0) {
          console.log("No user records found");
          res.status(404).send({ error: "No user medical records found" });
          return;
        }

        console.log("User medical records found successfully");
        res.status(200).send({ userDetails: results });
      }
    );
  } catch (error) {
    console.error("Error fetching user medical records:", error);
    res.status(500).send({ error: "Error fetching user medical records" });
  }
});

//Check if a user has used the predictive models
app.get("/api/check-chf-history/:userId", (req, res) => {
  const userId = req.params.userId;

  connection.query(
    "SELECT * FROM chf_prediction_history WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error querying CHF prediction history:", err);
        res.status(500).json({ error: "Error querying CHF prediction history" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ exists: false, message: "No CHF prediction history found" });
      } else {
        res.status(200).json({ exists: true, message: "CHF prediction history exists" });
      }
    }
  );
});

app.get("/api/check-mi-history/:userId", (req, res) => {
  const userId = req.params.userId;

  connection.query(
    "SELECT * FROM mi_prediction_history WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error querying MI prediction history:", err);
        res.status(500).json({ error: "Error querying MI prediction history" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ exists: false, message: "No MI prediction history found" });
      } else {
        res.status(200).json({ exists: true, message: "MI prediction history exists" });
      }
    }
  );
});



//Predicitve Models
const OpenAIInterpretationCHF = async (predictionData, confidencePercentage, apiKey) => {

  if (confidencePercentage < MIN_CONFIDENCE_THRESHOLD) {
    confidencePercentage = "0%";
  }
  
  try {
    const prompt = `Given the prediction data: ${JSON.stringify(
      predictionData
    )}, the confidence percentage is ${confidencePercentage}%, using this prediction model. Based on this data and the model's understanding of cardiovascular health, what is the likelihood (confidence score) that this individual has the presence of Congestive Heart Failure (CHF)? Please provide only the numerical value representing the confidence score. No Conversation is needed.`;

    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    };

    const response = await axios.post("https://api.openai.com/v1/chat/completions", requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].message.content;
    
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while generating text");
  }
};

const OpenAIInterpretationMI = async (predictionData, confidencePercentage, apiKey) => {

  if (confidencePercentage < MIN_CONFIDENCE_THRESHOLD) {
    confidencePercentage = "0%";
  }

  try {
    const prompt = `Given the prediction data: ${JSON.stringify(
      predictionData
    )}, the confidence percentage is ${confidencePercentage}%, using this prediction model. Based on this data and the model's understanding of cardiovascular health, what is the likelihood (confidence score) that this individual has the presence of Myocardial infarction (MI)? Please provide only the numerical value representing the confidence score. No Conversation is needed.`;

    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    };

    const response = await axios.post("https://api.openai.com/v1/chat/completions", requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].message.content;
    
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while generating text");
  }
};

app.get("/model/predict/mi/:userId", async (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT u.age, u.gender, mi.chest_pain, mi.resting_bp, mi.cholesterol_level, 
           mi.fasting_blood_sugar, mi.rest_ecg, mi.max_heart_rate, 
           mi.exercise_induced_angina, mi.oldpeak, mi.slope, 
           mi.num_major_vessels, mi.thalium_stress_test 
    FROM user u
    LEFT JOIN mi ON u.user_id = mi.user_id
    WHERE u.user_id = ?`;

  connection.query(sql, [userId], async (err, results) => {
    if (err) {
      console.error("Error retrieving user and MI details:", err);
      res.status(500).send("Error retrieving user and MI details");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("Data not found for the user ID");
      return;
    }

    const data = results[0];

    const MIdata = {
      age: data.age,
      sex: data.sex === "male" ? 0 : 1,
      cp: encodeChestPain(data.chest_pain),
      trestbps: data.resting_bp || 0,
      chol: data.cholesterol_level || 0,
      fbs: encodeFastingBloodSugar(data.fasting_blood_sugar),
      restecg: encodeRestingEcg(data.rest_ecg),
      thalach: data.max_heart_rate || 0,
      exang: encodeExceriseInduced(data.exercise_induced_angina),
      oldpeak: data.oldpeak || 0,
      slope: encodeSlope(data.slope),
      ca: data.num_major_vessels || 0,
      thal: data.thalium_stress_test || 0,
    };

    const confidencePercentage = await predictMI(MIdata);

    const ChatGpt_MyModel_cp = await OpenAIInterpretationMI(
      MIdata,
      confidencePercentage,
      "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"
    );

    const insertMISQL = `
    INSERT INTO mi_prediction_history (user_id, prediction_result, prediction_date, prediction_data)
    VALUES (?, ?, NOW(), ?)`;

    connection.query(
      insertMISQL,
      [userId, ChatGpt_MyModel_cp, JSON.stringify(MIdata)],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error inserting MI prediction:", insertErr);
          res.status(500).send("Error inserting MI prediction");
          return;
        }

        console.log("MI prediction inserted successfully");

        res.json({ MIdata, ChatGpt_MyModel_cp });
      }
    );
  });
});

async function predictMI(data) {
  const absoluteModelPath = path.resolve(
    "C:\\Users\\Damilola\\Documents\\Heart Attack\\Heart-Attack-App\\heartattackserver\\heart_attack\\model.json"
  );
  const model = await tf.loadLayersModel("file://" + absoluteModelPath);

  const input = preprocessInput(data);

  const prediction = model.predict(input);

  const confidencePercentage = convertToPercentage(prediction.dataSync()[0]);

  return confidencePercentage;
}

function encodeChestPain(value) {
  switch (value) {
    case "Typical Angina":
      return 0;
    case "Atypical Angina":
      return 1;
    case "Non-anginal Pain":
      return 2;
    case "Asymptomatic":
      return 3;
    default:
      return -1;
  }
}

function encodeFastingBloodSugar(value) {
  switch (value) {
    case "True":
      return 1;
    case "False":
      return 0;
    default:
      return -1;
  }
}

function encodeRestingEcg(value) {
  switch (value) {
    case "Normal":
      return 0;
    case "ST-T wave normality":
      return 1;
    case "Left ventricular hypertrophy":
      return 2;
    default:
      return -1;
  }
}

function encodeExceriseInduced(value) {
  switch (value) {
    case "No":
      return 0;
    case "Yes":
      return 1;
    default:
      return -1;
  }
}

function encodeSlope(value) {
  switch (value) {
    case "Upsloping":
      return 0;
    case "Flat":
      return 1;
    case "Downsloping":
      return 2;
    default:
      return -1;
  }
}

function preprocessInput(data) {
  const inputTensor = tf.tensor(Object.values(data), [
    1,
    Object.keys(data).length,
  ]);
  return inputTensor;
}

app.get("/model/predict/chf/:userId", async (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT u.age, u.gender, u.height, u.weight, chf.systolic, chf.diastolic, chf.cholesterol_stage, 
           chf.glucose, chf.smoke, chf.alcohol, chf.active 
    FROM user u
    LEFT JOIN chf ON u.user_id = chf.user_id
    WHERE u.user_id = ?`;

  connection.query(sql, [userId], async (err, results) => {
    if (err) {
      console.error("Error retrieving user and CHF details:", err);
      res.status(500).send("Error retrieving user and CHF details");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("Data not found for the user ID");
      return;
    }

    const chfData = results[0];

    const bmi = calculateBMI(chfData.height, chfData.weight);

    const pulse = calculatePulse(chfData.systolic, chfData.diastolic);

    const CHFdata = {
      Age: chfData.age,
      Gender: chfData.gender === "Male" ? 1 : 0,
      Height: chfData.height || 0,
      Weight: chfData.weight || 0,
      Systolic: chfData.systolic || 0,
      Diastolic: chfData.diastolic || 0,
      Cholesterol: encodeCholestrolStage(chfData.cholesterol_stage) || 0,
      Glucose: encodeGlucoseLevel(chfData.glucose) || 0,
      Smoke: encodeSmoke(chfData.smoke),
      Alcohol: encodeAlcohol(chfData.alcohol),
      Active: encodeActive(chfData.active),
      BMI: parseInt(bmi || 0),
      Pulse: pulse || 0,
    };

    const confidencePercentage = await predictCHF(CHFdata);

    const ChatGpt_MyModel_cp = await OpenAIInterpretationCHF(
      CHFdata,
      confidencePercentage,
      "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"
    );

    const insertCHFSQL = `
    INSERT INTO chf_prediction_history (user_id, prediction_result, prediction_date, prediction_data)
    VALUES (?, ?, NOW(), ?)`;

    connection.query(
      insertCHFSQL,
      [userId, ChatGpt_MyModel_cp, JSON.stringify(CHFdata)],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error inserting CHF prediction:", insertErr);
          res.status(500).send("Error inserting CHF prediction");
          return;
        }

        console.log("CHF prediction inserted successfully");

        res.json({ CHFdata, ChatGpt_MyModel_cp });
      }
    );
  });
});

function encodeCholestrolStage(value) {
  switch (value) {
    case "Normal":
      return 1;
    case "Above Normal":
      return 2;
    case "Well Above Normal":
      return 3;
    default:
      return -1;
  }
}

function encodeGlucoseLevel(value) {
  switch (value) {
    case "Normal":
      return 1;
    case "Above Normal":
      return 2;
    case "Well Above Normal":
      return 3;
    default:
      return -1;
  }
}

function encodeSmoke(value) {
  switch (value) {
    case "Yes":
      return 1;
    case "No":
      return 0;
    default:
      return -1;
  }
}

function encodeAlcohol(value) {
  switch (value) {
    case "Yes":
      return 1;
    case "No":
      return 0;
    default:
      return -1;
  }
}

function encodeActive(value) {
  switch (value) {
    case "Yes":
      return 1;
    case "No":
      return 0;
    default:
      return -1;
  }
}

function calculateBMI(height, weight) {
  return (weight / ((height / 100) * (height / 100))).toFixed(2);
}

function calculatePulse(systolic, diastolic) {
  return systolic - diastolic;
}

function convertToPercentage(prediction) {
  prediction = Math.max(0, Math.min(1, prediction));
  return prediction * 100;
}


async function predictCHF(data) {
  const absoluteModelPath = path.resolve(
    "C:\\Users\\Damilola\\Documents\\Heart Attack\\Heart-Attack-App\\heartattackserver\\heart_failure\\model.json"
  );
  const model = await tf.loadLayersModel("file://" + absoluteModelPath);

  const input = preprocessInput(data);

  const prediction = model.predict(input);

  const confidencePercentage = convertToPercentage(prediction.dataSync()[0]);

  return confidencePercentage;
}

//Check the data for each indiviual table
app.get("/model/checks/chf/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const chfData = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM chf WHERE user_id = ?",
        [userId],
        (err, results) => {
          if (err) {
            console.error("Error querying CHF data:", err);
            reject(err);
            return;
          }
          if (results.length === 0) {
            resolve(false);
          } else {
            resolve(results[0]);
          }
        }
      );
    });

    const isDataComplete = validateCHFData(chfData);

    res.json({ isDataComplete });

    console.error("Check Complete");
  } catch (error) {
    console.error("Error running CHF prediction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function validateCHFData(chfData) {
  const requiredFields = [
    "systolic",
    "diastolic",
    "cholesterol_stage",
    "glucose",
    "smoke",
    "alcohol",
    "active",
  ];

  let isDataComplete = true;
  for (const field of requiredFields) {
    if (!chfData[field]) {
      isDataComplete = false;
      break;
    }
  }
  return isDataComplete;
}

app.get("/model/checks/mi/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const miData = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM mi WHERE user_id = ?",
        [userId],
        (err, results) => {
          if (err) {
            console.error("Error querying MI data:", err);
            reject(err);
            return;
          }
          if (results.length === 0) {
            resolve(false);
          } else {
            resolve(results[0]);
          }
        }
      );
    });

    const isDataComplete = validateMIData(miData);

    res.json({ isDataComplete });

    console.error("Check Complete");
  } catch (error) {
    console.error("Error running MI prediction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function validateMIData(miData) {
  const requiredFields = [
    "chest_pain",
    "resting_bp",
    "cholesterol_level",
    "fasting_blood_sugar",
    "rest_ecg",
    "max_heart_rate",
    "slope",
    "num_major_vessels",
    "thalium_stress_test",
    "oldpeak",
  ];

  let isDataComplete = true;
  for (const field of requiredFields) {
    if (!miData[field]) {
      isDataComplete = false;
      break;
    }
  }
  return isDataComplete;
}


app.get("/api/fetch/mi/prediction/table/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const query = `
      SELECT prediction_result, prediction_date, prediction_data 
      FROM mi_prediction_history 
      WHERE user_id = ?;
    `;
    connection.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching MI prediction data:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Error fetching MI prediction data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/api/fetch/chf/prediction/table/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const query = `
      SELECT prediction_result, prediction_date, prediction_data 
      FROM chf_prediction_history 
      WHERE user_id = ?;
    `;
    connection.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching CHF prediction data:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Error fetching CHF prediction data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
