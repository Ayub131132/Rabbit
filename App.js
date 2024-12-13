import React, { useState, useEffect } from "react";
import "./App.css"; // Importing styles for animation

function App() {
  const [activeTab, setActiveTab] = useState("home"); // Tracks the active tab
  const [userId, setUserId] = useState(""); // Unique user ID
  const [points, setPoints] = useState(0); // Tracks the points for the current user
  const [animations, setAnimations] = useState([]); // Stores all active animations
  const [referralLink, setReferralLink] = useState(""); // Referral link for sharing
  const [showNotification, setShowNotification] = useState(false); // Manages the visibility of the notification
  const [checkinDone, setCheckinDone] = useState(false); // Tracks if the check-in is done today

  // Generate a unique user ID when the app starts (if not already generated)
  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = `user_${new Date().getTime()}`;
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
    setReferralLink(`${window.location.origin}?referral=${storedUserId}`);
  }, []);

  // Load points for the current user from localStorage
  useEffect(() => {
    if (userId) {
      const savedPoints = localStorage.getItem(`points_${userId}`);
      if (savedPoints) {
        setPoints(parseInt(savedPoints, 10));
      }
      // Check for daily check-in status
      const checkinStatus = localStorage.getItem(`checkin_${userId}`);
      setCheckinDone(checkinStatus === "true");
    }
  }, [userId]);

  // Save points for the current user to localStorage whenever they change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`points_${userId}`, points);
    }
  }, [points, userId]);

  // Save daily check-in status to localStorage
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`checkin_${userId}`, checkinDone);
    }
  }, [checkinDone, userId]);

  // Function to switch tabs
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  // Function to increase points and trigger animation
  const incrementPoints = () => {
    setPoints(points + 1);

    // Add a new animation to the array
    const newAnimation = { id: Date.now(), value: "+1" };
    setAnimations((prevAnimations) => [...prevAnimations, newAnimation]);

    // Remove the animation after 1 second
    setTimeout(() => {
      setAnimations((prevAnimations) =>
        prevAnimations.filter((anim) => anim.id !== newAnimation.id)
      );
    }, 1000);
  };

  // Function to handle referral link copy
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setShowNotification(true); // Show the notification

      // Hide the notification after 1.5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 1500);
    });
  };

  // Function for Daily Check-in
  const handleCheckin = () => {
    if (!checkinDone) {
      setPoints(points + 1); // Increment points by 1
      setCheckinDone(true);
    }
  };

  // Function for completing a task and getting reward
  const completeTask = (taskName) => {
    setPoints(points + 100000); // Add 100K points for each task completed
    Notification(`Task "${taskName}" completed! You earned 100,000 points.`);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      {/* Notification Banner */}
      {showNotification && (
        <div className="notification-banner">
          Referral link copied!
        </div>
      )}

      {/* Main Content */}
      <div style={{ padding: "20px", paddingBottom: "70px" }}>
        {/* Home Tab */}
        {activeTab === "home" && (
          <div>
            {/* Points Counter */}
            <div style={{ fontSize: "18px", marginBottom: "10px" }}>
              Total Balance: <strong>{points} points</strong>
            </div>
            {/* Image with Tap Animation */}
            <div
              onClick={incrementPoints}
              style={{
                position: "relative",
                display: "inline-block",
                width: "200px",
                height: "200px",
              }}
            >
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczMpzSUAzdCaUh9Yf-P1Z0epzBUxKNs9Ga99ofCJeBMfUnV3pK8FUl_YMoS38vMqFS1oLK5TTzuVZbSW3CBPIddx9MZ0KziEpr5u42mFX_R8cvVzaRmPeQgrmRl0PGBMg5MB18Z19V1Hcd70ZxN1avpS=w721-h721-s-no-gm?authuser=0"
                alt="Clickable Reward"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
              />
              {/* Render all active animations */}
              {animations.map((animation) => (
                <div key={animation.id} className="floating-animation">
                  {animation.value}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div>
            <h2>Complete Tasks to Earn 100K Points</h2>
            <div className="task-item">
              <div className="task-text">Join the Telegram channel</div>
              <a href="https://t.me/zapdashcommunity" target="_blank" rel="noopener noreferrer">
                <button onClick={() => completeTask("Join Telegram Channel")} className="task-button">
                  Complete Task
                </button>
              </a>
            </div>
            <div className="task-item">
              <div className="task-text">Follow us on Instagram</div>
              <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <button onClick={() => completeTask("Follow Instagram")} className="task-button">
                  Complete Task
                </button>
              </a>
            </div>
            <div className="task-item">
              <div className="task-text">Join Tiiny Verse</div>
              <a href="https://www.tiinyverse.com" target="_blank" rel="noopener noreferrer">
                <button onClick={() => completeTask("Join Tiiny Verse")} className="task-button">
                  Complete Task
                </button>
              </a>
            </div>
            <div className="task-item">
              <div className="task-text">Join Cube</div>
              <a href="https://www.cube.com" target="_blank" rel="noopener noreferrer">
                <button onClick={() => completeTask("Join Cube")} className="task-button">
                  Complete Task
                </button>
              </a>
            </div>
            <div className="task-item">
              <div className="task-text">Join Bit U Mine</div>
              <a href="https://www.bitumines.com" target="_blank" rel="noopener noreferrer">
                <button onClick={() => completeTask("Join Bit U Mine")} className="task-button">
                  Complete Task
                </button>
              </a>
            </div>
            <div className="task-item">
              <div className="task-text">Join Match3</div>
              <a href="https://www.match3.com" target="_blank" rel="noopener noreferrer">
                <button onClick={() => completeTask("Join Match3")} className="task-button">
                  Complete Task
                </button>
              </a>
            </div>
            <div className="task-item">
              <div className="task-text">Join ChatGPT</div>
              <a href="https://www.openai.com" target="_blank" rel="noopener noreferrer">
                <button onClick={() => completeTask("Join ChatGPT")} className="task-button">
                  Complete Task
                </button>
              </a>
            </div>
          </div>
        )}

        {/* Friends Tab */}
        {activeTab === "friends" && (
          <div>
            <h2>Invite Friends to Earn 100K Points!</h2>
            <p>
              Share this referral link with your friends to earn 100K points:
              <br />
              <strong>{referralLink}</strong>
            </p>
            <button onClick={copyReferralLink} className="copy-referral-button">
  Copy Referral Link
</button>
          </div>
        )}

        {/* Boost Tab (Empty) */}
        {activeTab === "boost" && <p>Boost your rewards here!</p>}
      </div>

      {/* Fixed Navigation Tabs */}
      <div className="fixed-tabs">
        <button onClick={() => switchTab("home")} className="tab-button">
          Home
        </button>
        <button onClick={() => switchTab("tasks")} className="tab-button">
          Earn
        </button>
        <button onClick={() => switchTab("friends")} className="tab-button">
          Friends
         </button>
      </div>
    </div>
  );
}

export default App;