import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

""" Links connected to the dataset: https://archive.ics.uci.edu/dataset/45/heart+disease """
# Load heart dataset from CSV file
heart_dataset = pd.read_csv("Heart-Attack-Predictor/Data-Collection/Attack/heart.csv", sep=',')

# Define new column names for better readability
new_column_names = {
    'age': 'Age',
    'sex': 'Sex',
    'cp': 'ChestPain',
    'trtbps': 'RestingBP',
    'chol': 'Cholesterol',
    'fbs': 'FastingBloodSugar',
    'restecg': 'RestECG',
    'thalachh': 'MaxHeartRate',
    'exng': 'ExerciseInducedAngina',
    'slp': 'Slope',
    'caa': 'NumMajorVessels',
    'thall': 'ThaliumStressTest',
    'oldpeak': 'Oldpeak',
    'output' : 'Output'
}

# Rename columns using the defined mapping
heart_dataset = heart_dataset.rename(columns=new_column_names)

# Understanding Dataset - For Heart Attack Dataset #

# Display data types of each column in the dataset
heart_dataset.dtypes

# Display data types of each column in the dataset
#print("The shape of the dataset is : ", heart_dataset.shape)

cat_cols = ['Sex','ExerciseInducedAngina','NumMajorVessels','ChestPain','FastingBloodSugar','RestECG','Slope','ThaliumStressTest']
con_cols = ["Age","RestingBP","Cholesterol","MaxHeartRate","Oldpeak"]
target_col = ["Output"]

#print("The categorial cols are : ", cat_cols)
#print("The continuous cols are : ", con_cols)
#print("The target variable is :  ", target_col)

# Data Cleaning - For Heart Attack Dataset #

# Check for missing values
heart_dataset.isnull().sum()

# Check for and remove duplicate rows
heart_dataset.duplicated().sum()
heart_dataset = heart_dataset.drop_duplicates()

# Display summary statistics of the dataset
heart_dataset.describe().to_string(max_rows=None)

# EDA - For Heart Attack Dataset #
""" For more EDA Analysis check out this notebook: https://www.kaggle.com/code/caesarmario/listen-to-your-heart-a-disease-prediction/notebook#5.-|-EDA-%F0%9F%93%88 """

# Countplot for categorical variables
plt.figure(figsize=(14, 8))
for i, col in enumerate(cat_cols, 1):
    plt.subplot(2, 4, i)
    sns.countplot(x=col, data=heart_dataset)
    plt.title(f'Countplot of {col}')
    plt.xlabel(col)
    plt.ylabel('Count')
#plt.tight_layout()
#plt.show()

# Histograms for continuous variables
plt.figure(figsize=(14, 8))
for i, col in enumerate(con_cols, 1):
    plt.subplot(2, 3, i)
    sns.histplot(heart_dataset[col], kde=True)
    plt.title(f'Histogram of {col}')
    plt.xlabel(col)
    plt.ylabel('Frequency')
#plt.tight_layout()
#plt.show()

# Boxplot and Violin plot for continuous variables vs. target
plt.figure(figsize=(14, 8))
for i, col in enumerate(con_cols, 1):
    plt.subplot(2, 3, i)
    sns.boxplot(x='Output', y=col, data=heart_dataset)
    plt.title(f'{col} vs. Output')
    plt.xlabel('Output')
    plt.ylabel(col)
#plt.tight_layout()
#plt.show()


# Boxplot and Violin plot for categorical variables vs. target
plt.figure(figsize=(14, 8))
for i, col in enumerate(cat_cols, 1):
    plt.subplot(2, 4, i)
    sns.countplot(x=col, hue='Output', data=heart_dataset)
    plt.title(f'{col} vs. Output')
    plt.xlabel(col)
    plt.ylabel('Count')
#plt.tight_layout()
#plt.show()

# Data Preprocessing - For Heart Attack Dataset #

from sklearn.preprocessing import RobustScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Define features and target variable
X = heart_dataset.drop(columns=['Output'])  # Features
y = heart_dataset['Output']  # Target variable

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

# Model Training - For Heart Attack Dataset #

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