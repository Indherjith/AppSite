import { useEffect, useState } from 'react';
import './CSS/Home.css';
import home_image from "../assets/home_image.avif";
import static_image from "../assets/static_image.jpeg";
import dynamic_image from "../assets/dynamic_image.jpg";
import ecomm_image from "../assets/ecomm_image.avif";
import software_image from "../assets/software_image.jpeg";
import android_image from "../assets/android_image.jpg";
import deploy from "../assets/deploy.jpg";

const phrases = [
  {
    image: home_image,
    title: "Welcome to AndSite Solutions",
    message: "We build modern websites and mobile apps for your business."
  },
  {
    image: static_image,
    title: "Static Websites",
    message: "We craft visually appealing static websites tailored to your brand identity."
  },
  {
    image: dynamic_image,
    title: "Dynamic Websites",
    message: "Deliver engaging and interactive experiences with our dynamic web solutions."
  },
  {
    image: ecomm_image,
    title: "E-commerce Websites",
    message: "Boost your online sales with powerful, scalable e-commerce platforms."
  },
  {
    image: software_image,
    title: "Computer Softwares",
    message: "Custom-built desktop software to optimize your business operations."
  },
  {
    image: android_image,
    title: "Android Applications",
    message: "Create fast, user-friendly Android apps for your customers and teams."
  },
  {
    image: deploy,
    title: "Application Deployment",
    message: "We handle secure and efficient deployment for your web and mobile apps."
  }
];

function preloadImages() {
  phrases.forEach(phrase => {
    const img = new Image();
    img.src = phrase.image;
  });
}

function Home() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    preloadImages(); // Preload images once on mount

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % phrases.length);
        setFade(true);
      }, 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-5">
      <div className={`image-container ${fade ? "fade" : ""}`}>
        <img
          src={phrases[index].image}
          alt="Banner"
          className="responsive-image"
          style={{ opacity: 0.7 }}
        />
        <div className="overlay-text">
          <h1>{phrases[index].title}</h1>
          <p>{phrases[index].message}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
