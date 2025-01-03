# Hospital Management System  

## 📋 Overview  

The **Hospital Management System (HMS)** is a user-friendly, efficient, and secure solution designed to simplify and streamline the administrative and clinical processes of healthcare facilities. This system integrates essential hospital functions, reducing manual work and enhancing patient care.  

---
## 📑 Table of Contents  

- [✨ Features](#-features)  
- [💡 Benefits](#-benefits)  
- [📂 Project Structure](#-project-structure)  
- [🚀 Getting Started](#-getting-started)  
- [🔧 Usage](#-usage)  
- [🤝 Contribution](#-contribution)  
- [📄 License](#-license)  
- [🙌 Acknowledgments](#-acknowledgments)  
- [📞 Contact](#-contact)  

---

## ✨ Features  

### 🏥 Patient Management  
- Register and maintain patient records, including medical history and contact details.  
- Track in-patient and out-patient details efficiently.  

### 📅 Appointment Scheduling  
- Allow patients to book, modify, or cancel appointments.  
- Optimize scheduling to minimize wait times.  

### 💳 Billing and Payment  
- Automate billing workflows with support for insurance claims and payment tracking.  
- Generate detailed invoices for patients and stakeholders.  

### 🏨 Rooms Management  
- Allocate rooms to in-patients based on availability.  
- Maintain records of room types (general, private, ICU) and their occupancy status.    

### 🗂️ Records Management  
- Centralized management of patient medical records, staff data, and administrative documents.  
- Easy retrieval and updates of historical records.    

### 💳 Payment Integration    
- Integration with popular payment gateways for seamless transactions like stripe.  
- Generate detailed receipts and transaction records for patients.    

---

## 💡 Benefits  

- **Efficiency Boost:** Automates routine tasks, freeing up staff for critical responsibilities.  
- **Accurate Documentation:** Minimizes errors in patient data, billing, and scheduling.  
- **Enhanced Patient Care:** Provides immediate access to detailed patient records for better treatment.  
- **Regulatory Compliance:** Aligns with healthcare industry standards and regulations.  
- **Data Security:** Protects sensitive information through advanced encryption and role-based access.  

---
## 📂 Project Structure

```plaintext
Hospital-Management-System/ 
├── HMS/
| ├── bill_management/     # Handles Payments like Salaries, Invoices
| ├── doctor_management/   # Manages Doctor
│ ├── HMS/                 # Core app
| ├── nurse_management/    # Manages Nurse
| ├── patient_management/  # Manages Patient
| ├── records_management/  # Handles Patient records
| ├── rooms_management/    # Handles rooms
| ├── staff_management/    # Manages Staffs
| ├── user_management/     # Handles User login, registration and Admin
│ ├── db.sqlite3           # Database
│ └── manage.py            # Driver file
├── venv
├── .gitignore
├── LICENSE
├── README.md
└── requirements.txt
```

<details>
<summary> Click to Expand Project Structure</summary>

```plaintext
Hospital-Management-System/ 
├── HMS/
| ├── bill_management/
| │ ├── migrations/
| │ ├── templates/
| │ ├── __init__.py 
| │ ├── admin.py 
| │ ├── apps.py
| │ ├── filters.py 
| │ ├── forms.py 
| │ ├── middlewares.py
| │ ├── models.py 
| │ ├── permissions.py 
| │ ├── serializers.py
| │ ├── signals.py 
| │ ├── tests.py 
| │ ├── urls.py 
| │ └── views.py
| ├── doctor_management/
| │ ├── migrations/
| │ ├── templates/
| │ ├── __init__.py 
| │ ├── admin.py 
| │ ├── apps.py
| │ ├── filters.py 
| │ ├── forms.py 
| │ ├── middlewares.py
| │ ├── models.py 
| │ ├── permissions.py 
| │ ├── serializers.py
| │ ├── signals.py 
| │ ├── tests.py 
| │ ├── urls.py 
| │ └── views.py
│ ├── HMS/
| │ ├── init.py 
| │ ├── asgi.py 
| │ ├── settings.py 
| │ ├── urls.py 
| │ └── wsgi.py 
| ├── nurse_management/
| │ ├── migrations/
| │ ├── templates/
| │ ├── __init__.py 
| │ ├── admin.py 
| │ ├── apps.py
| │ ├── filters.py 
| │ ├── forms.py 
| │ ├── middlewares.py
| │ ├── models.py 
| │ ├── permissions.py 
| │ ├── serializers.py
| │ ├── signals.py 
| │ ├── tests.py 
| │ ├── urls.py 
| │ └── views.py
| ├── patient_management/
| │ ├── migrations/
| │ ├── templates/
| │ ├── __init__.py 
| │ ├── admin.py 
| │ ├── apps.py
| │ ├── filters.py 
| │ ├── forms.py 
| │ ├── middlewares.py
| │ ├── models.py 
| │ ├── permissions.py 
| │ ├── serializers.py
| │ ├── signals.py 
| │ ├── tests.py 
| │ ├── urls.py 
| │ └── views.py
| ├── records_management/
| │ ├── migrations/
| │ ├── templates/
| │ ├── __init__.py 
| │ ├── admin.py 
| │ ├── apps.py
| │ ├── filters.py 
| │ ├── forms.py 
| │ ├── middlewares.py
| │ ├── models.py 
| │ ├── permissions.py 
| │ ├── serializers.py
| │ ├── signals.py 
| │ ├── tests.py 
| │ ├── urls.py 
| │ └── views.py
| ├── rooms_management/
| │ ├── migrations/
| │ ├── templates/
| │ ├── __init__.py 
| │ ├── admin.py 
| │ ├── apps.py
| │ ├── filters.py 
| │ ├── forms.py 
| │ ├── middlewares.py
| │ ├── models.py 
| │ ├── permissions.py 
| │ ├── serializers.py
| │ ├── signals.py 
| │ ├── tests.py 
| │ ├── urls.py 
| │ └── views.py
| ├── staff_management/
| │ ├── migrations/
| │ ├── templates/
| │ ├── __init__.py 
| │ ├── admin.py 
| │ ├── apps.py
| │ ├── filters.py 
| │ ├── forms.py 
| │ ├── middlewares.py
| │ ├── models.py 
| │ ├── permissions.py 
| │ ├── serializers.py
| │ ├── signals.py 
| │ ├── tests.py 
| │ ├── urls.py 
| │ └── views.py
| ├── user_management/
| │ ├── migrations/
| │ ├── templates/
| │ ├── __init__.py 
| │ ├── admin.py 
| │ ├── apps.py
| │ ├── filters.py 
| │ ├── forms.py 
| │ ├── middlewares.py
| │ ├── models.py 
| │ ├── permissions.py 
| │ ├── serializers.py
| │ ├── signals.py 
| │ ├── tests.py 
| │ ├── urls.py 
| │ └── views.py
│ ├── db.sqlite3 
│ └── manage.py
├── venv
├── .gitignore
├── LICENSE
├── README.md
└── requirements.txt
```

</details>

---

## 🚀 Getting Started  

### Prerequisites  
Ensure your system meets the following requirements:  
- Python 3.8+  
- Django Framework  

### Installation  
1. **Clone the Repository:**  
   ```bash  
   git clone https://github.com/duttaturja/Hospital-Management-System.git  
   cd Hospital-Management-System  
   ```  
2. **Virtual Environment Setup:**
    ```bash  
   python -m venv venv
   venv\Scripts\activate
   ``` 
3. **Install Dependencies:**  
   ```bash  
   pip install -r requirements.txt  
   ```  
4. **Set Up the Database:**  
   ```bash  
   python manage.py makemigrations  
   python manage.py migrate  
   ```  
5. **Run the Development Server:**  
   ```bash  
   python manage.py runserver  
   ```  
6. Access the system at `http://127.0.0.1:8000/`.  

---

## 🔧 Usage  

1. Log in as an administrator to manage hospital operations.  
2. Register patients, schedule appointments, and manage billing directly from the dashboard.  
3. Use the reporting module for analytics and performance reviews.  

---

## 🤝 Contribution  

We welcome contributions to improve this system. To contribute:  
1. Fork the repository.  
2. Create a new branch for your feature or bug fix.  
3. Commit your changes and create a pull request.  

---

## 📄 License  

This project is licensed under the MIT License. However, if you use or distribute this project, you **must provide appropriate credit** to the original authors by mentioning:  

- **Project Name:** Hospital Management System  
- **Original Authors:** [duttaturja](https://github.com/duttaturja) and [ProbalSourav](https://github.com/ProbalSourav)  

See the [LICENSE](LICENSE) file for detailed terms.  

---

## 🙌 Acknowledgments  

- Thanks to our team for their dedication to this project.  
- Special appreciation to healthcare professionals for their invaluable insights.  

---

## 📞 Contact  

For questions or support, contact us:  
- **Email:** [duttaturja@gmail.com](mailto:duttaturja@gmail.com),    [probalnath50@gmail.com](mailto:probalnath50@gmail.com)
- **GitHub:** [@duttaturja](https://github.com/duttaturja),    [@ProbalSourav](https://github.com/ProbalSourav)
