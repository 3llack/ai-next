"use client";
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import productsData from './data/products.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [randomProducts, setRandomProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const estates = [
    { src: '/assets/imgs/lekki-aviation.webp', label: 'Lekki Aviation', size: 45 },
    { src: '/assets/imgs/granville.webp', label: 'GranVille Estate', size: 50 },
    { src: '/assets/imgs/majestic.webp', label: 'Majestic Bay', size: 40 },
    { src: '/assets/imgs/parliament.webp', label: 'The Parliament', size: 42 },
    { src: '/assets/imgs/casa.webp', label: 'Harmony Casa', size: 48 },
    { src: '/assets/imgs/oju-alaro.webp', label: 'Oju Alaro', size: 38 },
    { src: '/assets/imgs/harmony-ville.webp', label: 'Harmony Ville', size: 46 }
  ];

  const getRandomProducts = () => {
    const shuffled = [...productsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    const query = searchQuery;
    setSearchQuery(''); // Clear input field immediately

    try {
      const response = await fetch('/api/gemini-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();

      if (response.ok) {
        setAiResponse(data.response);
        setRandomProducts(getRandomProducts());
      } else {
        setAiResponse('Sorry, there was an error processing your request. Please try again.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setAiResponse('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleProductClick = () => {
    window.open('https://landbookbyharmony.com/', '_blank');
  };

  // Styles
  const styles = {
    navHero: {
      background: '#fff',
      color: '#fff',
      paddingTop: '100px',
      lineHeight: '10px'
    },
    inputSection: {
      color: '#000',
      // width: '100%',
      maxWidth: '750px',
      margin: 'auto',
      border: '1px solid #bebebe',
      borderRadius: '50px',
      textAlign: 'center',
      fontSize: '15px',
      boxSizing: 'border-box',
      backgroundImage: "url('/assets/imgs/search.svg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: '12px center',
      backgroundSize: '18px',
      padding: '15px 15px 15px 40px'
    },
    bgColor: {
      backgroundColor: '#efefef'
    },
    main: {
      padding: '25px 0'
    },
    shadowedBody: {
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      borderRadius: '12px',
      padding: '24px',
      backgroundColor: '#fff',
      overflow: 'hidden'
    },
    cardImg: {
      width: '100%',
      height: 'auto',
      transition: 'transform 0.3s ease-in-out'
    },
    cardTitle: {
      fontSize: '35px',
      paddingTop: '15px',
      paddingBottom: '3.5px',
      color: '#000',
      textAlign: 'center'
    },
    cardText: {
      paddingTop: '3.5px',
      paddingBottom: '15px',
      paddingLeft: '10px',
      paddingRight: '10px',
      textAlign: 'center',
      fontSize: '13px',
      color: '#999'
    },
    footer: {
      padding: '25px 10px',
      textAlign: 'center'
    },
    estateLabel: {
      display: 'block',
      marginTop: '6px',
      fontSize: '10px',
      fontWeight: '500',
      color: '#6c757d',
      textAlign: 'center',
      maxWidth: '90px',
      lineHeight: '1.2',
      wordWrap: 'break-word'
    },
    circleContainer: {
      width: '55px',
      height: '55px',
      padding: '5px'
    },
    estateImg: {
      maxWidth: '80%',
      maxHeight: '80%',
      objectFit: 'contain'
    }
  };

  return (
    <>
      <style jsx>
        {`
          .card-body img:hover {
            transform: scale(1.15);
          }
          .input_section::placeholder {
            color: #bebebe;
          }
          .input_section:focus {
            outline: none;
          }
          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          @media (max-width: 450px) {
            body {
              background-color: #ebebeb !important;
            }
            .nav_hero {
              background-color: #ebebeb !important;
            }
            .main {
              background-color: #ebebeb !important;
            }
            .footer {
              background-color: #ebebeb !important;
            }
            .logos {
              background-color: #fdfdfd !important;
              border-radius: 15px !important;
              padding: 17px 10px !important;
              max-height: 114px;
              overflow: hidden;
            }
            .input_section {
              background-color: #ddd;
              border: none !important;
              font-weight: lighter;
            }
            .input_section::placeholder {
              color: #525252;
              font-size: 9px;
            }
          }
          @media (min-width: 460px) {
            .logos {
              max-height: 95px;
              overflow: hidden;
            }
          }
          @media (min-width: 360px) {
            .input_section {
              width: 80vw;
              padding: 15px 15px 15px 40px;
            }
            .card-body {
              margin-top: 15px;
              display: block;
              justify-content: center;
            }
          }
          @media (min-width: 768px) {
            .card-body {
              padding: 5px;
            }
            .card-title {
              font-size: 25px;
            }
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="nav_hero" style={styles.navHero}>
        <div className="container">
          <div className="row text-center">
            <div className="pb-4" style={{ display: 'inline-block' }}>
              <a className="navbar-brand" href="https://landbookbyharmony.com/" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/imgs/ai-logo.png" width={200} height={60} alt="logo" style={{ width: 'auto', height: 'auto' }} />
              </a>
            </div>
          </div>

          <div className="row justify-content-center text-center">
            <div className="col-xl-10">
              <label>
                <input
                  className="input_section shadow-sm"
                  style={styles.inputSection}
                  placeholder="ask anything about the Nigerian real estate market"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>

          {/* AI Response Section */}
          {isLoading && (
            <div className="row mt-4">
              <div className="col-xl-10 mx-auto">
                <div
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '10px'
                  }}
                >
                  <div
                    style={{
                      height: '20px',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '4px',
                      marginBottom: '10px',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}
                  />
                  <div
                    style={{
                      height: '20px',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '4px',
                      width: '100%',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {aiResponse && !isLoading && (
            <div className="row mt-4">
              <div className="col-xl-10 mx-auto">
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '10px',
                    color: '#333',
                    lineHeight: '1.6'
                  }}
                >
                  <p style={{ margin: 0 }}>{aiResponse}</p>
                </div>
              </div>
            </div>
          )}

          <div className="row mt-2">
            <div className="text-center">
              <div className="d-inline-flex justify-content-center flex-wrap gap-4 mt-4 logos">
                {estates.map((estate, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="d-flex justify-content-center align-items-center rounded-circle shadow-sm mx-auto"
                      style={{ ...styles.bgColor, ...styles.circleContainer }}
                    >
                      <Image src={estate.src} alt={estate.label} width={50} height={50} className="estate-img" style={styles.estateImg} />
                    </div>
                    <small className="d-block mt-2 text-muted" style={styles.estateLabel}>
                      {estate.label}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main - Dynamic Products Section */}
      <section className="main" style={styles.main}>
        <div className="container">
          <div className="row">
            {isLoading
              ? // Skeleton loading cards
                [1, 2, 3].map((i) => (
                  <div key={i} className="col-xl-4 col-lg-4 col-md-4">
                    <div className="card-body" style={styles.shadowedBody}>
                      <div
                        style={{
                          width: '100%',
                          height: '200px',
                          backgroundColor: '#e0e0e0',
                          borderRadius: '8px',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}
                      />
                      <div
                        style={{
                          height: '30px',
                          backgroundColor: '#e0e0e0',
                          borderRadius: '4px',
                          marginTop: '15px',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}
                      />
                      <div
                        style={{
                          height: '60px',
                          backgroundColor: '#e0e0e0',
                          borderRadius: '4px',
                          marginTop: '10px',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}
                      />
                    </div>
                  </div>
                ))
              : randomProducts.length > 0
              ? // Actual product cards
                randomProducts.map((product) => (
                  <div key={product.id} className="col-xl-4 col-lg-4 col-md-4">
                    <div className="card-body" style={{ ...styles.shadowedBody, cursor: 'pointer' }} onClick={handleProductClick}>
                      <Image src={product.image} alt="house-img" className="card-img" width={400} height={300} style={styles.cardImg} />

                      <h3 className="card-title" style={styles.cardTitle}>
                        {product.title}
                      </h3>
                      <p className="card-text" style={styles.cardText}>
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))
              : // Placeholder cards when no search has been made
                [1, 2, 3].map((i) => (
                  <div key={i} className="col-xl-4 col-lg-4 col-md-4">
                    <div className="card-body" style={styles.shadowedBody}>
                      <div
                        style={{
                          width: '100%',
                          height: '200px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#999'
                        }}
                      >
                        <span>Search to see properties</span>
                      </div>
                      <div
                        style={{
                          height: '30px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '4px',
                          marginTop: '15px'
                        }}
                      />
                      <div
                        style={{
                          height: '60px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '4px',
                          marginTop: '10px'
                        }}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="footer" style={styles.footer}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12 d-flex justify-content-center align-items-center">
              <p>© 2025 Harmony Garden & Estate Development Limited - Ilamija, Ibeju-Lekki, Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
