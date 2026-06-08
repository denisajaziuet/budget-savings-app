# Budget Savings App

Budget Savings App është një aplikacion web për menaxhimin e shpenzimeve personale. Projekti është ndërtuar me arkitekturën MERN dhe përfshin regjistrim, hyrje, menaxhim të shpenzimeve dhe dashboard me statistika.

## Çfarë përfshin projekti

Ky projekt ka këto pjesë kryesore:

* **Frontend** me React
* **Backend** me Node.js dhe Express
* **Databazë** me MongoDB Atlas
* **Autentifikim** me JWT
* **Hashim fjalëkalimesh** me bcrypt
* **State management** me Redux Toolkit dhe RTK Query

## Funksionalitetet

* Regjistrim dhe hyrje në sistem
* Logout
* Shtim, përditësim dhe fshirje e shpenzimeve
* Shfaqja e listës së shpenzimeve
* Totali i shpenzimeve
* Statistika sipas kategorive
* Dashboard i thjeshtë dhe minimalist

## Si të inicializohet projekti

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Variablat e nevojshme

### Backend `.env`

```env
NODE_ENV=development
PORT=8000
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection_string
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:8000/api
```

## Struktura e projektit

```txt
budget-savings-app/
├── backend/
└── frontend/
```

## Autori

Denis Ajazi
