#Crear modelo para predecir transacciones fraudulentas

# Import necessary libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Read the dataset into a DataFrame
df = pd.read_csv("card_transdata.csv")

# Display the first 5 rows of the DataFrame
df.head()

# Select specific columns of interest
df = df[['distance_from_home', 'distance_from_last_transaction', 'ratio_to_median_purchase_price',
         'repeat_retailer', 'used_chip', 'used_pin_number', 'online_order', 'fraud']]

# Display DataFrame information
df.info()

# Check the value counts of the 'fraud' column
df['fraud'].value_counts()

# Split the data into features (x) and target (y)
x = df.drop('fraud', axis=1)
y = df['fraud']

# Import necessary libraries for model building
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Split the data into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.30, random_state=1)

# Initialize and train a Logistic Regression classifier
classifier = LogisticRegression(solver='liblinear')
classifier.fit(x_train, y_train)

# Make predictions on the test set
y_predict = classifier.predict(x_test)

# Create a DataFrame to compare actual and predicted values
Results = pd.DataFrame({'Actual': y_test, 'Predictions': y_predict})
Results.head(5)

# Calculate and print accuracy on the test set
from sklearn.metrics import accuracy_score
print(accuracy_score(y_test, y_predict))

# Calculate and print accuracy on the training set
y_train_predict = classifier.predict(x_train)
print(accuracy_score(y_train, y_train_predict))

# Calculate and print the confusion matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_predict)
print(cm)

# Visualize the confusion matrix using a heatmap
import seaborn as sns
plt.figure(figsize=(10, 7))
sns.heatmap(cm, annot=True)
plt.title('Confusion Matrix - Test Data')
plt.xlabel('Predicted Label')
plt.ylabel('True Label')

# Create a more detailed confusion matrix visualization
plt.clf()
plt.imshow(cm, interpolation='nearest', cmap=plt.cm.Wistia)
classNames = ['0', '1']
plt.title('Confusion Matrix - Test Data')
plt.ylabel('True label')
plt.xlabel('Predicted label')
tick_marks = np.arange(2)
plt.xticks(tick_marks, classNames, rotation=45)
plt.yticks(tick_marks, classNames)

# Add labels and values to the cells of the confusion matrix
s = [['TN', 'FP'], ['FN', 'TP']]
for i in range(2):
    for j in range(2):
        plt.text(j, i, str(s[i][j]) + "= " + str(cm[i][j]))
plt.show()

# Calculate and print a classification report
from sklearn.metrics import classification_report
print(classification_report(y_test, y_predict))

# Calculate and print recall, precision, specificity, and accuracy
TN = cm[0][0]
FP = cm[0][1]
FN = cm[1][0]
TP = cm[1][1]

recall = TP / (TP + FN)
print('Recall =', recall)

precision = TP / (TP + FP)
print("Precision =", precision)

specificity = TN / (TN + FP)
print("Specificity =", specificity)

accuracy = (TP + TN) / (TP + TN + FP + FN)
print("Accuracy =", accuracy)
