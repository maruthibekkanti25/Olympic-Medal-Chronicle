import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import logo from '../../images/image2.avif';
import logo2 from '../../images/photo.webp';
import logo3 from '../../images/shannu.jpg';
import logo4 from '../../images/image3.webp';
import logo5 from '../../images/image5.webp';
import logo6 from '../../images/journeejpg.jpg';
const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { 
            image: 'https://mediaproxy.salon.com/width/1200/https://media2.salon.com/2024/08/simone_biles_rebeca_andrade_jordan_chiles_2164937576.jpg', 
            heading: 'Welcome to the Olympics 2024', 
            text: 'Uniting the world through sportsmanship and competition.'
        },
        { 
            image: 'https://static.theprint.in/wp-content/uploads/2023/08/2023-08-27T203907Z_1_LYNXMPEJ7Q07U_RTROPTP_4_ATHLETICS-WORLD-1.jpg', 
            heading: 'Athletes at Their Best', 
            text: 'Witness the world’s top athletes compete for gold.'
        },
        { 
            image: 'https://images.yourstory.com/cs/2/96eabe90392211eb93f18319e8c07a74/olympicdayy-1687461367442.png?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75', 
            heading: 'Celebrate Global Unity', 
            text: 'Nations come together to celebrate excellence in sport.'
        },
        { 
            image: 'https://media.aws.iaaf.org/media/Original/23351e86-a7bd-41f1-8fc4-a8cfb54aefe8.jpg?v=-1509262560', 
            heading: 'Moments of Glory', 
            text: 'Every match, every race, every event makes history.'
        },
        { 
            image: 'https://framerusercontent.com/images/RvOlPOmKCSOhFeqt3bdriZyzq9I.png', 
            heading: 'A Legacy of Greatness', 
            text: 'The Olympics are a symbol of achievement and inspiration.'
        },
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <main className="main-content">
            <section 
                className="section-1" 
                style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            >
                <div className="slideshow-text">
                    <h2>{slides[currentSlide].heading}</h2>
                    <p>{slides[currentSlide].text}</p>
                </div>
            </section>
            <section className="section-2">
                <h2>Top Olympic Stories</h2>
                <div className="stories-container">
                    <div className="story-card">
                        <img src={logo} alt="Top Story 1" className="story-image" />
                        <h3>Gold Medal Triumph for Team USA</h3>
                        <p>The USA team continues its dominance in athletics, securing multiple gold medals...</p>
                        <a href="https://www.teamusa.com/news/2024/august/10/the-u-s-closes-out-on-track-events-of-paris-2024-with-three-golds-two-from-relays">Read more</a>
                    </div>
                    <div className="story-card">
                        <img src={logo2} alt="Top Story 2" className="story-image" />
                        <h3>Historic Win for the Women's Soccer Team</h3>
                        <p>A thrilling match ends with a historic win for the women's soccer team...</p>
                        <a href="https://time.com/7009804/us-womens-soccer-team-gold-medal-win-paris-summer-olympics/">Read more</a>
                    </div>
                    <div className="story-card">
                        <img src={logo3} alt="Top Story 3" className="story-image" />
                        <h3>New Olympic Records Set in Swimming</h3>
                        <p>Several records were broken during the swimming events, bringing excitement to the fans...</p>
                        <a href="https://www.npr.org/2024/08/02/nx-s1-5055865/paris-olympic-pool-slow-records">Read more</a>
                    </div>
                </div>
            </section>
            <section className="section-3">
      <h2>About the Olympics</h2>
    <div className="about-container">
        <div className="image-text-block">
            <img src={logo4} alt="Olympics Games" />
            <p>The Olympic Games are the world’s foremost sports competition, featuring summer and winter games that bring together athletes from all nations. With over 200 nations participating, the Games inspire global unity through the celebration of athletic excellence.</p>
        </div>

        <div className="image-text-block">
            <img src={logo5} alt="Athletes" />
            <p>Athletes from all corners of the world dedicate years of their lives in pursuit of Olympic glory. The Games represent the pinnacle of sporting achievement and an opportunity for athletes to showcase their talents on the global stage.</p>
        </div>

        <div className="image-text-block">
            <img src={logo6} alt="Ceremony" />
            <p>The Opening Ceremony is one of the most spectacular aspects of the Olympics, featuring cultural performances and the traditional lighting of the Olympic torch, symbolizing the start of the Games and the unity of the nations involved.</p>
        </div>
    </div>
    <p className="section-description">
        The Olympics are more than just a sports competition – they are a celebration of human spirit, athleticism, and the shared values of excellence, friendship, and respect. Every four years, the world comes together to watch history in the making.
    </p>
    </section>
        </main>
    );
};

export default Home;
