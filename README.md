Got it! Here's the **full `README.md`** file in one clean block, ready to copy-paste into your project:

---

```md
# 3D Capsule Viewer (OBJ/MTL)

This is a 3D model viewer built with **Next.js**, **React Three Fiber**, and **Drei**. It supports `.obj` + `.mtl` model loading with textures, light controls, camera reset, and dark mode toggle.

---

## 📦 Features

- ✅ Load `.obj` models with `.mtl` materials and textures
- 🌀 Orbit camera controls
- 🌞 Light intensity slider
- 🌗 Dark/light theme toggle
- 📊 Show/hide render stats
- 📋 Basic model info display

---

## 🧱 Tech Stack

- [Next.js](https://nextjs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Drei](https://github.com/pmndrs/drei)
- [Three.js](https://threejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

---

## 📁 Folder Structure

```
/public/models/
│   capsule.obj
│   capsule.mtl
│   capsule0.jpg

/components/
│   ui/         // UI components like Button, Card, Slider

/app/
│   model-viewer/ // Main 3D Viewer component/page
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/harisankar705/3d-viewer.git
cd 3d--viewer
```

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn
```

### 3. Run the development server

```bash
npm run dev
```

Then open your browser at:  
📍 http://localhost:3000

---

## 🖼 Add Your Model

Place your `.obj`, `.mtl`, and `.jpg` texture in the `public/models/` folder.

### Example structure:

```
public/models/
├── capsule.obj
├── capsule.mtl
└── capsule0.jpg
```

### Make sure:

- Your `.obj` file references the `.mtl` correctly:
  ```obj
  mtllib capsule.mtl
  usemtl material0
  ```

- Your `.mtl` file references the texture like this:
  ```mtl
  newmtl material0
  map_Kd capsule0.jpg
  ```

---

## 🧪 Troubleshooting

| Issue | Solution |
|-------|----------|
| ❌ Model not showing | Check dev console for errors, check filenames and case sensitivity |
| ❌ Texture not loading | Ensure the image file is in `public/models/` and matches `map_Kd` in the `.mtl` |
| ❌ Model too small or big | Adjust `scale={}` and `position={}` in your `<primitive />` |
| ❌ Camera acting weird | Use the "Reset Camera" button or check OrbitControls |

---

## 📄 License

MIT License.  
You are free to use, modify, and distribute this project.

---

## 💡 Want to Contribute?

Pull requests are welcome!  
You can improve this project by:

- Adding support for `.glb`, `.gltf`, or `.fbx`
- Model switching/uploading
- Animation support
- Drag & drop 3D file loader
- UI improvements

---

## 🧑‍💻 Author

👨‍💻 Built by a passionate MERN stack student learning 3D and React!  
If you liked this project, feel free to ⭐️ it or give feedback.

```

---

Let me know if you'd like me to also create:

- `.gitignore`
- `package.json` template
- A GitHub description
- Deployment guide (like on Vercel)

Just ask bro, I got you 💻🔥