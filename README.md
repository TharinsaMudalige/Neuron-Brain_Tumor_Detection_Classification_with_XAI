🧠 **Brain Tumor Identification and Classification with Explainable AI** 

📌 **Project Overview** 

This project is a deep learning-based brain tumor detection and classification web application that uses MRI images for tumor segmentation, identification and classification.  
The system provides explainable AI using LIME, SHAP, and Grad-CAM techniques to help users understand the model's predictions. This project aims to assist medical professionals
in brain tumour diagnosis by speeding up the diagnostic process. Users can sign up with their details and log in to the system where they can upload one MRI scan at a time and
get the segmentation (if there is a tumour present), classification and XAI results. A report can be downloaded containing all these results for future use. All the instructions
on how to use the system are included in the 'help' page. Furthermore, users can provide feedback on the system after using it, which gets saved in our database to help make
necessary improvements. 

🛠️ **Features** 

1. Upload MRI scans for tumor segmentation, detection, and classification.
2. Uses a hybrid model (CNN + ViT) for tumor detection and classification.
3. Provides explainability using: 

   - LIME (Local Interpretable Model-agnostic Explanations)
   - SHAP (SHapley Additive exPlanations) 
   - Grad-CAM (Gradient-weighted Class Activation Mapping) 

4. Download a report containing all the results.
   

![image alt](https://github.com/TharinsaMudalige/Neuron-Brain_Tumor_Detection_Classification_with_XAI/blob/2865a356620a37df6cba8d3084aaa5ee371e3408/Readme_images/img_1.png)


![image alt](https://github.com/TharinsaMudalige/Neuron-Brain_Tumor_Detection_Classification_with_XAI/blob/2865a356620a37df6cba8d3084aaa5ee371e3408/Readme_images/img_2.jpg)

🏗️ **Project Architecture** 

1. User logs in or registers 
2. Uploads an MRI image 
3. Image preprocessing 
4. Segmentation using U-Net model 
5. Classification using CNN + ViT hybrid model
6. XAI methods applied to explain predictions 
7. Result + report download 
8. Optional feedback submission 

📊 **Technologies Used** 

- Frontend: React, HTML, CSS, JavaScript
- Backend: Flask (Python) 
- Modeling: TensorFlow, Keras, Pytorch
- XAI: SHAP, LIME, Grad-CAM 
- Database: Workbench 
- Others: OpenCV, NumPy, Matplotlib, scikit-learn, pandas 

🧪 **Model Details** 

- CNN layers used: [Conv2D → MaxPooling → Flatten → Dense] 
- ViT implementation: [Patch creation → Linear Projection → Transformer Encoder → Classification Head] 
- Segmentation model (U-Net)
- Evaluation metrics: Accuracy, Precision, Recall, F1-score 

🧑‍💻 **How to Run the Project Locally** 

1. Clone the repository 
2. Create a virtual environment and activate it 
3. Install necessary dependencies:  

- TensorFlow - 2.18.0 
- Keras - 3.8.0 
- Numpy - 1.26.4
- Sklearn - 1.6.1
- Pandas - 2.2.2
- Matplotlib - 3.10.0
- Seaborn - 0.13.2 
- Python - 3.11.11
- React with Vite - 22.11.0 
 
4. Start the server: python app.py
5. Start the database: node server.cjs
6. Start the web application: npm run dev 

📁 **Directory Structure** 

├── Detection_Classification_CNN/ 

├── Detection_Claasification_ViT/

├── Explainable AI/ 

├── Image preprocessing/

├── React Frontend/ NEURON/ 

├── README.md 

🗃️ **Dataset Information** 

- Datasets: https://www.kaggle.com/datasets/awsaf49/brats20-dataset-training-validation , https://www.kaggle.com/datasets/fernando2rad/brain-tumor-mri-images-44c ,
  https://www.kaggle.com/datasets/tombackert/brain-tumor-mri-data
- Modalities: T1, T2, T1CE, FLAIR 
- Preprocessing: Normalization, resizing, Augmentation  

👩‍⚕️ **Target Users** 

- Radiologists
- Radiographers
- Neurologists 
- Medical Researchers
- Medical Students 

📦 **Future Improvements** 

- Future developments can be focused on improving model accuracy, training the model with a relatively larger dataset, architecture optimisation and performing hyperparameter tuning.
The accuracy of determining and classifying the diagnosis could be enhanced by increasing the system to analyse more imaging modalities such as CT and PET scan images. Cloud based
deployment will enhance the faster real-time predictions, also the computational efficiency can also be maximised.  

- The system’s usability can be improved by adding multilingual support to the system and by enhancing UI/UX improvements. Real-world deployment will benefit by adding clinical decision
support tools to the system.  

📬 **Contact** 

Venuki Mudalige 
📧 Email: venuki.20232784@iit.ac.lk  

Thisarani Jayaweera 
📧 Email: thisarani.20232802@iit.ac.lk  

Vimesh Herath 
📧 Email: vimesh.20233171@iit.ac.lk   

Sadeesh de Silva
📧 Email: nammuni.20232513@iit.ac.lk 

 
