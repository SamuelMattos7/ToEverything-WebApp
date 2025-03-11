import React from 'react';
import "../css/Home.css";
import CategoriesImage from "../img/Homepage/Categories.webp";
import Management from "../img/Homepage/Management.webp";
import Priority from "../img/Homepage/Priority.webp";
import Todo from "../img/Homepage/Todo-app.jpg";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

function Index() {
    return (
        <div>
            <header>
                <Nav/>
            </header>
            <div className="introSection">
                <div className="welcomeIntro">
                    <h2>Welcome ToEverything</h2>
                    <h6>Stay organized, hit your goals, and make the most of your day. Let’s get started on your tasks because every step counts!</h6>
                    <button className="button-4" role="button">Start for free</button>
                </div>
                <div className="imageIntro">
                    <img src={Todo} alt="Task management app" />
                </div>
            </div>

            <div className="container">
                <h1>Why ToEverything? Our Features</h1>
                <p>Discover a variety of tools designed to keep you organized, manage your deadlines efficiently, and stay on track with your goals. With the right resources at your fingertips, you can boost productivity and accomplish more with ease.</p>
    
                <div style={{margin: '40px 0'}}>
                    <h2>📋 Task management</h2>
                    <p>Our powerful task management system allows you to create tasks quickly with a simple interface. You can organize them by project, deadline, or importance. Each task can have a title, description, due date, and custom labels to help you stay organized.</p>
                </div>
                
                <div style={{margin: '40px 0'}}>
                    <h2>📁 Task categories</h2>
                    <p>Keep your tasks neatly organized by categorizing them into different sections based on your preferences. Whether you're working on personal projects, professional tasks, or things like shopping lists, you can create custom categories for better structure.</p>
                </div>
                
                
                <div style={{margin: '40px 0'}}>
                    <h2>🏷️ Priority labels</h2>
                    <p>Stay on top of your most important tasks with our priority labeling system. Each task can be assigned a priority level — High, Medium, or Low — to help you quickly identify what needs your immediate attention. High-priority tasks will stand out with distinct colors.</p>
                </div>
                
                
                <div style={{margin: '40px 0'}}>
                    <h2>🔄 Calendar Integration</h2>
                    <p>Seamlessly sync your tasks with popular calendar applications including Google Calendar, Apple Calendar, and Microsoft Outlook. View your tasks alongside meetings and appointments, ensuring you never miss a deadline or important event.</p>
                </div>
                
                <div style={{margin: '40px 0'}}>
                    <h2>📱 Mobile App</h2>
                    <p>Take your productivity on the go with our feature-rich mobile application available for iOS and Android. Create and manage tasks from anywhere, receive notifications for upcoming deadlines, and stay synced across all your devices.</p>
                </div>
                
                <div style={{margin: '40px 0'}}>
                    <h2>👥 Collaboration Features</h2>
                    <p>Work together more efficiently by sharing task lists, assigning responsibilities, and tracking progress as a team. Perfect for families, project teams, or anyone who needs to coordinate tasks with others.</p>
                </div>
                
                <div style={{margin: '40px 0'}}>
                    <h2>📊 Data Management</h2>
                    <p>Easily export your data in multiple formats (CSV, PDF, Excel) for reporting or backup purposes. Import existing task lists from other applications to make switching to ToEverything smooth and hassle-free.</p>
                </div>
            </div>

            <div className="pricing">
                <div className="pricing-title">
                    <h2>Find the Perfect Plan for Your Productivity Needs</h2>
                    <h6>We believe task management should be simple, efficient, and tailored to you.</h6>
                </div>
                <div className="pricing-container">
                    <div className="pricing-box">
                        <h2>Free Plan</h2>
                        <div className="target-audience">For casual users or those trying the app for the first time</div>
                        <div className="price">$0/month</div>
                        <div className="plan-features">
                            <ul>
                                <li>Basic task management</li>
                                <li>Up to 3 task categories</li>
                                <li>Limited priority labels</li>
                                <li>Basic reminders/notifications</li>
                                <li>Sync across up to 2 devices</li>
                                <li>Community support</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pricing-box">
                        <h2>Pro Plan</h2>
                        <div className="target-audience">For regular users who need enhanced productivity tools</div>
                        <div className="price">$5–$10/month</div>
                        <div className="plan-features">
                            <ul>
                                <li>Unlimited tasks and categories</li>
                                <li>Customizable priority labels</li>
                                <li>Calendar integration</li>
                                <li>Advanced reminders</li>
                                <li>Subtasks and progress tracking</li>
                                <li>Unlimited device sync</li>
                                <li>Dark mode and themes</li>
                                <li>Priority email support</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pricing-box">
                        <h2>Team Plan</h2>
                        <div className="target-audience">For small teams or organizations needing task collaboration</div>
                        <div className="price">$10–$15/user/month</div>
                        <div className="plan-features">
                            <ul>
                                <li>All Pro Plan features</li>
                                <li>Team collaboration tools</li>
                                <li>Task assignment</li>
                                <li>Real-time updates</li>
                                <li>Activity logs</li>
                                <li>Admin controls</li>
                                <li>10GB cloud storage per user</li>
                                <li>Premium support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Index;
