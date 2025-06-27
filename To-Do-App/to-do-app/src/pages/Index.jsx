import React from 'react';
import "../css/Home.css";
import Todo from "../img/Homepage/Todo-app.jpg";
import Nav from '../components/Nav.jsx';
import { useState,useEffect } from "react";
import axios from "axios";

function Index() {

    const [username, setUsernme] = useState("")
    const [isLoggedIn, setLoggedIn] = useState(false)

    useEffect (() =>{
        const checkLoggedUser = async () => {
            try{
                const token = localStorage.getItem("accessToken");
                if(token){
                    const config = {
                        headers: {
                            "Authorization":`Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://127.0.0.1:8000/api/user/", config)
                    setLoggedIn(true)
                    setUsernme(response.data.username)
                }
                else{
                    setLoggedIn(false);
                    setUsernme("");
                }
            }
            catch{
                setLoggedIn(false);
                setUsernme("");
            }
        };
        checkLoggedUser()
    }, [])

    const Footer = () => (
        <footer className="bg-gray-100 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
                <p>&copy; 2024 ToEverything. All rights reserved.</p>
            </div>
        </footer>
    );

    const StatCard = ({ title, value, color, icon }) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    const FeatureCard = ({ icon, title, description }) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-2xl mb-4">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
    );

    const PricingCard = ({ title, subtitle, price, features, isPopular = false }) => (
        <div className={`bg-white rounded-xl p-6 shadow-sm border ${isPopular ? 'border-blue-200 ring-2 ring-blue-100' : 'border-gray-100'} hover:shadow-md transition-shadow`}>
            {isPopular && (
                <div className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm mb-4">{subtitle}</p>
            <div className="text-3xl font-bold text-gray-900 mb-6">{price}</div>
            <ul className="space-y-3 mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                ))}
            </ul>
            <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${isPopular ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                Get Started
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Nav />
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        {isLoggedIn ? (
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Welcome ToEverything, {username}
                            </h1>
                        ) : (
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Welcome ToEverything
                            </h1>
                        )}
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Stay organized, hit your goals, and make the most of your day. Let's get started on your tasks because every step counts!
                        </p>
                        <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                            Start for free
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-900">Task Overview</h3>
                                <p className="text-gray-500 text-sm">Your productivity at a glance</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <StatCard 
                                    title="Total Tasks" 
                                    value="24" 
                                    color="bg-blue-100" 
                                    icon={<svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                                />
                                <StatCard 
                                    title="Completed" 
                                    value="18" 
                                    color="bg-green-100" 
                                    icon={<svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>}
                                />
                                <StatCard 
                                    title="Pending" 
                                    value="6" 
                                    color="bg-orange-100" 
                                    icon={<svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>}
                                />
                                <StatCard 
                                    title="High Priority" 
                                    value="3" 
                                    color="bg-red-100" 
                                    icon={<svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why ToEverything? Our Features</h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Discover a variety of tools designed to keep you organized, manage your deadlines efficiently, and stay on track with your goals.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                    <FeatureCard 
                        icon="📋"
                        title="Task Management"
                        description="Create tasks quickly with a simple interface. Organize them by project, deadline, or importance with custom labels and descriptions."
                    />
                    <FeatureCard 
                        icon="📁"
                        title="Task Categories"
                        description="Keep your tasks neatly organized by categorizing them into different sections based on your preferences and project types."
                    />
                    <FeatureCard 
                        icon="🏷️"
                        title="Priority Labels"
                        description="Stay on top of your most important tasks with our priority labeling system. High, Medium, or Low priority levels with distinct colors."
                    />
                    <FeatureCard 
                        icon="🔄"
                        title="Calendar Integration"
                        description="Seamlessly sync with Google Calendar, Apple Calendar, and Microsoft Outlook. Never miss a deadline or important event."
                    />
                    <FeatureCard 
                        icon="📱"
                        title="Mobile App"
                        description="Take your productivity on the go with our mobile app for iOS and Android. Stay synced across all your devices."
                    />
                    <FeatureCard 
                        icon="👥"
                        title="Collaboration"
                        description="Work together efficiently by sharing task lists, assigning responsibilities, and tracking progress as a team."
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Find the Perfect Plan for Your Productivity Needs</h2>
                    <p className="text-gray-600 text-lg">We believe task management should be simple, efficient, and tailored to you.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <PricingCard 
                        title="Free Plan"
                        subtitle="For casual users or those trying the app for the first time"
                        price="$0/month"
                        features={[
                            "Basic task management",
                            "Up to 3 task categories",
                            "Limited priority labels",
                            "Basic reminders/notifications",
                            "Sync across up to 2 devices",
                            "Community support"
                        ]}
                    />
                    <PricingCard 
                        title="Pro Plan"
                        subtitle="For regular users who need enhanced productivity tools"
                        price="$5–$10/month"
                        features={[
                            "Unlimited tasks and categories",
                            "Customizable priority labels",
                            "Calendar integration",
                            "Advanced reminders",
                            "Subtasks and progress tracking",
                            "Unlimited device sync",
                            "Dark mode and themes",
                            "Priority email support"
                        ]}
                        isPopular={true}
                    />
                    <PricingCard 
                        title="Team Plan"
                        subtitle="For small teams or organizations needing task collaboration"
                        price="$10–$15/user/month"
                        features={[
                            "All Pro Plan features",
                            "Team collaboration tools",
                            "Task assignment",
                            "Real-time updates",
                            "Activity logs",
                            "Admin controls",
                            "10GB cloud storage per user",
                            "Premium support"
                        ]}
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Index;
