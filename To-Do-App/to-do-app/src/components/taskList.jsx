import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Calendar, Clock, Flag, CheckCircle2, Circle } from 'lucide-react';
import axios from 'axios';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/task/list/', {headers: 
        {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
      })
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios.delete(`http://127.0.0.1:8000/task/delete/${id}/`)
        .then(() => {
          setTasks(tasks.filter(task => task.Id !== id));
        })
        .catch(err => {
          console.error("Error deleting task: ", err);
          setError(err);
        });
    }
  };
  
  const isCompleted = (status) =>
    status?.toUpperCase() === 'COMPLETED';

  const formatPriority = (priority) => {
    if (!priority) return 'Normal';
    return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const normalizedFilter = filter.toLowerCase();
    if (normalizedFilter === 'completed') return isCompleted(task.task_status);
    if (normalizedFilter === 'pending') return !isCompleted(task.task_status);
    return true; 
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => isCompleted(t.task_status)).length,
    pending: tasks.filter(t => !isCompleted(t.task_status)).length,
    highPriority: tasks.filter(t => t.label?.toLowerCase() === 'high' && !isCompleted(t.task_status)).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-red-800">Error: {error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">My Tasks</h1>
              <p className="text-slate-600">Stay organized and productive</p>
            </div>
            <a
              href="tasks/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <Plus size={20} />
              Add Task
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Calendar className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle2 className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <Clock className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-xl">
                <Flag className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="flex gap-2">
            {['all', 'pending', 'completed'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg capitalize transition-all duration-200 ${filter === filterOption
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {filterOption} ({filterOption === 'all' ? stats.total : filterOption === 'completed' ? stats.completed : stats.pending})
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.Id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <button className="mt-1 transition-colors duration-200">
                  {isCompleted(task.task_status) ? (
                    <CheckCircle2 className="text-green-600" size={24} />
                  ) : (
                    <Circle className="text-slate-400 hover:text-slate-600" size={24} />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-lg font-semibold ${isCompleted(task.task_status) ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                        {task.task_name}
                      </h3>
                      {task.description && (
                        <p className="text-slate-600 text-sm mt-1">{task.description}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <a
                        href={`tasks/edit/${task.Id}`}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      >
                        <Edit3 size={16} />
                      </a>
                      <button
                        onClick={() => deleteTask(task.Id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Tags and Info */}
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.label)}`}>
                      {formatPriority(task.label)} priority
                    </span>
                    
                    {task.end_date && (
                      <span className="text-slate-500 text-xs flex items-center gap-1">
                        <Calendar size={12} />
                        Due {task.end_date}
                      </span>
                    )}
                    
                    <a
                      href={`tasks/details/${task.Id}`}
                      className="text-blue-600 hover:text-blue-700 text-xs font-medium hover:underline"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-slate-400" size={32} />
            </div>
            <h3 className="text-slate-600 text-lg font-medium mb-2">No tasks found</h3>
            <p className="text-slate-500">
              {filter === 'completed' && 'No completed tasks yet. Keep working!'}
              {filter === 'pending' && 'All tasks completed! Great job!'}
              {filter === 'all' && 'Start by adding your first task.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}