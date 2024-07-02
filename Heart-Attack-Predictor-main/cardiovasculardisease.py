import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Load heart dataset from CSV file
cardio_dataset = pd.read_csv("Heart-Attack-Predictor/Data-Collection/Cardio/cardio_train.csv", sep=';')

# Define new column names for better readability
new_column_names = {
    'age': 'Age',
    'gender': 'Gender',
    'height': 'Height',
    'weight': 'Weight',
    'ap_hi': 'Systolic',
    'ap_lo': 'Diastolic',
    'cholesterol': 'Cholesterol',
    'gluc': 'Glucose',
    'smoke': 'Smoke',
    'alco': 'Alcohol',
    'active': 'Active',
    'cardio': 'Cardio'
}

# Rename columns using the defined mapping
cardio_dataset = cardio_dataset.rename(columns=new_column_names)

# Understanding Dataset - For Cardio Vascular Dataset #

# Check for missing values
cardio_dataset.isnull().sum()

# Check for duplicate rows
duplicate_sum = cardio_dataset.duplicated().sum()

# Display data types of each column in the dataset
cardio_dataset.dtypes

#Overall data overview
cardio_dataset.describe().to_string(max_rows=None)

# Data Cleaning - For Cardio Vascular Dataset #

cardio_dataset_cleaned = cardio_dataset.copy()

#Drop the id column as it is not needed
cardio_dataset_cleaned.drop(columns=['id'], inplace=True)

cardio_dataset_cleaned.drop_duplicates(keep = 'first', inplace = True)

#Changing Gender representation
cardio_dataset['Gender'] = cardio_dataset['Gender'].replace({1: 0, 2: 1})

# Removing Weight and Height Outliers
        
# Transforming variables to remove outliers
cardio_dataset_cleaned[['Height', 'Weight']] = np.log(cardio_dataset_cleaned[['Height', 'Weight']])

# Removing Outliers less than 0.5% and 99%
cardio_dataset_cleaned = cardio_dataset_cleaned[(cardio_dataset_cleaned['Weight'] > cardio_dataset_cleaned['Weight'].quantile(0.005)) & (cardio_dataset_cleaned['Weight'] < cardio_dataset_cleaned['Weight'].quantile(0.995))]
cardio_dataset_cleaned = cardio_dataset_cleaned[(cardio_dataset_cleaned['Height'] > cardio_dataset_cleaned['Height'].quantile(0.005)) & (cardio_dataset_cleaned['Height'] < cardio_dataset_cleaned['Height'].quantile(0.995))]

# Remove Diastolic and Systolic rows that are negative

cardio_dataset_cleaned = cardio_dataset_cleaned[cardio_dataset_cleaned['Diastolic']>=0]
cardio_dataset_cleaned = cardio_dataset_cleaned[cardio_dataset_cleaned['Systolic']>=0]

cardio_dataset_cleaned = cardio_dataset_cleaned[cardio_dataset_cleaned['Systolic'] >= cardio_dataset_cleaned['Diastolic']].reset_index(drop=True)

# Normalising Diastolic and Systolic rows

cardio_dataset_cleaned = cardio_dataset_cleaned[(cardio_dataset_cleaned["Systolic"]<=250) & (cardio_dataset_cleaned["Diastolic"]<=200)]

# Nomalising Age as it is in Days

cardio_dataset_cleaned['Age'] = cardio_dataset_cleaned['Age'].div(365).apply(lambda x: int(x))

#After converting Age to Years, the dataset has alot of duplicate rows, so lets drop them inorder to build a generalized predictive model

cardio_dataset_cleaned.drop_duplicates(keep = 'first', inplace = True)

print('Total {} datapoints remaining with {} features'.format(cardio_dataset_cleaned.shape[0], cardio_dataset.shape[1]))

# EDA - For Cardio Vascular Dataset #

# Feature Engineering - For Cardio Vascular Dataset #

#Create new feature BMI
def BMI(data):
    return np.exp(data['Weight']) / (np.exp(data['Height'])/100)**2 

cardio_dataset_cleaned['BMI'] = cardio_dataset_cleaned.apply(BMI, axis=1)

#Pulse rate
def PULSE(data):
    return np.subtract(data['Systolic'], data['Diastolic'])
 
cardio_dataset_cleaned['pulse'] = cardio_dataset_cleaned.apply(PULSE, axis=1)

# Data Preprocessing - For Heart Attack Dataset #

from sklearn.preprocessing import RobustScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Define features and target variable
X = cardio_dataset_cleaned.drop(columns=['Cardio'])  # Features
y = cardio_dataset_cleaned['Cardio']  # Target variable

# Define transformers for scaling and encoding
numeric_transformer = Pipeline(steps=[
    ('scaler', RobustScaler())])

categorical_transformer = Pipeline(steps=[
    ('onehot', OneHotEncoder(drop='first'))])

# Identify numeric and categorical features
numeric_features = X.select_dtypes(include=['int64', 'float64']).columns
categorical_features = X.select_dtypes(include=['object']).columns

# Combine transformers
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)])

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Apply preprocessing to train and test sets
X_train_preprocessed = preprocessor.fit_transform(X_train)
X_test_preprocessed = preprocessor.transform(X_test)

print("\nReady for model training and testing\n")

# Model Training - For Cardio Vascular Dataset #

#Models
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier


#Accuracy Score
from sklearn.metrics import accuracy_score

#Random Forest Classifier#

#Random Forest Classifier
rf_classifier = RandomForestClassifier()

# Fit the model
rf_classifier.fit(X_train_preprocessed, y_train)

rf_y_pred = rf_classifier.predict(X_test_preprocessed)
rf_accuracy = accuracy_score(y_test, rf_y_pred)
print("Random Forest Classifier Accuracy:", rf_accuracy)


#Logistic Regression#

#Logistic Regression Classifier
lr_classifier = LogisticRegression()

# Fit the model
lr_classifier.fit(X_train_preprocessed, y_train)

lr_y_pred = lr_classifier.predict(X_test_preprocessed)
lr_accuracy = accuracy_score(y_test, lr_y_pred)
print("Logistic Regression Accuracy:", lr_accuracy)

#K-Nearest Neighbors#

#K-Nearest Neighbors Classifier
knn_classifier = KNeighborsClassifier()

# Fit the model
knn_classifier.fit(X_train_preprocessed, y_train)

knn_y_pred = knn_classifier.predict(X_test_preprocessed)
knn_accuracy = accuracy_score(y_test, knn_y_pred)
print("K-Nearest Neighbors Accuracy:", knn_accuracy)

#Support Vector Machine#

#Support Vector Machine Classifier
svm_classifier = SVC()

# Fit the model
svm_classifier.fit(X_train_preprocessed, y_train)

svm_y_pred = svm_classifier.predict(X_test_preprocessed)
svm_accuracy = accuracy_score(y_test, svm_y_pred)
print("Support Vector Machine Accuracy:", svm_accuracy)

#Decision Tree#

#Decision Tree Classifier
dt_classifier = DecisionTreeClassifier()

# Fit the model
dt_classifier.fit(X_train_preprocessed, y_train)

dt_y_pred = dt_classifier.predict(X_test_preprocessed)
dt_accuracy = accuracy_score(y_test, dt_y_pred)
print("Decision Tree Classifier Accuracy:", dt_accuracy)

# Hyper Tunning - For Heart Attack Dataset #

print("\nReady for Hypertunning\n")

#Hyper Tunning
from sklearn.model_selection import GridSearchCV
import warnings
warnings.filterwarnings("ignore")

#Random Forest Classifier#

# Hyperparameters for Random Forest
rf_param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 5, 10],
    'min_samples_split': [2, 5, 10]
}

rf_classifier = RandomForestClassifier()

# Perform Grid Search with cross-validation
rf_grid_search = GridSearchCV(rf_classifier, param_grid=rf_param_grid, cv=5)
rf_grid_search.fit(X_train_preprocessed, y_train)

# Get best hyperparameters
best_rf_params = rf_grid_search.best_params_

best_rf_classifier = RandomForestClassifier(**best_rf_params)
best_rf_classifier.fit(X_train_preprocessed, y_train)
best_rf_y_pred = best_rf_classifier.predict(X_test_preprocessed)
best_rf_accuracy = accuracy_score(y_test, best_rf_y_pred)

# Display accuracy
print("Random Forest Classifier Accuracy (after hyperparameter tuning):", best_rf_accuracy)

#Logistic Regression#

# Hyperparameters for Logistic Regression
lr_param_grid = {
    'C': [0.1, 1, 10],
    'penalty': ['l1', 'l2']
}

# Perform Grid Search with cross-validation
lr_grid_search = GridSearchCV(lr_classifier, param_grid=lr_param_grid, cv=5)
lr_grid_search.fit(X_train_preprocessed, y_train)

# Get best hyperparameters
best_lr_params = lr_grid_search.best_params_

best_lr_classifier = LogisticRegression(**best_lr_params)
best_lr_classifier.fit(X_train_preprocessed, y_train)
best_lr_y_pred = best_lr_classifier.predict(X_test_preprocessed)
best_lr_accuracy = accuracy_score(y_test, best_lr_y_pred)

# Display accuracy
print("Logistic Regression Accuracy (after hyperparameter tuning):", best_lr_accuracy)

#K-Nearest Neighbors#

# Hyperparameters for K-Nearest Neighbors
knn_param_grid = {
    'n_neighbors': [3, 5, 7],
    'weights': ['uniform', 'distance'],
    'algorithm': ['auto', 'ball_tree', 'kd_tree']
}

# Perform Grid Search with cross-validation
knn_grid_search = GridSearchCV(knn_classifier, param_grid=knn_param_grid, cv=5)
knn_grid_search.fit(X_train_preprocessed, y_train)

# Get best hyperparameters
best_knn_params = knn_grid_search.best_params_

best_knn_classifier = KNeighborsClassifier(**best_knn_params)
best_knn_classifier.fit(X_train_preprocessed, y_train)
best_knn_y_pred = best_knn_classifier.predict(X_test_preprocessed)
best_knn_accuracy = accuracy_score(y_test, best_knn_y_pred)

# Display accuracy
print("K-Nearest Neighbors Accuracy (after hyperparameter tuning):", best_knn_accuracy)

#Support Vector Machine#

# Hyperparameters for Support Vector Machine
svm_param_grid = {
    'C': [0.1, 1, 10],
    'kernel': ['linear', 'poly', 'rbf', 'sigmoid'],
    'gamma': ['scale', 'auto']
}

# Perform Grid Search with cross-validation
svm_grid_search = GridSearchCV(svm_classifier, param_grid=svm_param_grid, cv=5)
svm_grid_search.fit(X_train_preprocessed, y_train)

# Get best hyperparameters
best_svm_params = svm_grid_search.best_params_

best_svm_classifier = SVC(**best_svm_params)
best_svm_classifier.fit(X_train_preprocessed, y_train)
best_svm_y_pred = best_svm_classifier.predict(X_test_preprocessed)
best_svm_accuracy = accuracy_score(y_test, best_svm_y_pred)

# Display accuracy
print("Support Vector Machine Accuracy (after hyperparameter tuning):", best_svm_accuracy)

#Decision Tree#

#Hyperparameters for Decision Tree
dt_param_grid = {
    'max_depth': [None, 5, 10, 15],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Perform Grid Search with cross-validation
dt_grid_search = GridSearchCV(dt_classifier, param_grid=dt_param_grid, cv=5)
dt_grid_search.fit(X_train_preprocessed, y_train)

# Get best hyperparameters
best_dt_params = dt_grid_search.best_params_

best_dt_classifier = DecisionTreeClassifier(**best_dt_params)
best_dt_classifier.fit(X_train_preprocessed, y_train)
best_dt_y_pred = best_dt_classifier.predict(X_test_preprocessed)
best_dt_accuracy = accuracy_score(y_test, best_dt_y_pred)

# Display accuracy
print("Decision Tree Classifier Accuracy (after hyperparameter tuning):", best_dt_accuracy)