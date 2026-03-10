import React, { useState, useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart
} from 'recharts';
import {
  Sun, Bell, User, Menu, X, ChevronDown, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Clock, Zap, Thermometer, Waves,
  Activity, BarChart3, Settings, FileText, MapPin, Search,
  ChevronRight, Cpu
} from 'lucide-react';

const Solvantis = () => {
  const [isDark, setIsDark] = useState(true);
  const [selectedSite, setSelectedSite] = useState('Site A');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, type: 'critical', title: 'Inverter Malfunction', site: 'Site B', time: '2 min ago', desc: 'Inverter 3 stopped responding', status: 'open' },
    { id: 2, type: 'warning', title: 'Performance Drop', site: 'Site A', time: '15 min ago', desc: '23% below expected output', status: 'open' },
    { id: 3, type: 'info', title: 'Maintenance Scheduled', site: 'Site C', time: '1 hour ago', desc: 'Panel cleaning scheduled', status: 'acknowledged' },
    { id: 4, type: 'critical', title: 'String Fault Detected', site: 'Site A', time: '3 hours ago', desc: 'String 5 monitoring anomaly', status: 'resolved' }
  ]);

  // Mock data
  const realtimePowerData = [
    { time: '00:00', power: 0 },
    { time: '04:00', power: 2 },
    { time: '08:00', power: 45 },
    { time: '10:00', power: 280 },
    { time: '12:00', power: 420 },
    { time: '14:00', power: 385 },
    { time: '16:00', power: 210 },
    { time: '18:00', power: 45 },
    { time: '20:00', power: 5 },
    { time: '22:00', power: 0 }
  ];

  const dailyProductionData = [
    { day: 'Mon', production: 1240 },
    { day: 'Tue', production: 1420 },
    { day: 'Wed', production: 980 },
    { day: 'Thu', production: 1580 },
    { day: 'Fri', production: 1650 },
    { day: 'Sat', production: 1480 },
    { day: 'Sun', production: 1320 }
  ];

  const tempVoltageData = [
    { time: '00:00', temp: 22, voltage: 400 },
    { time: '06:00', temp: 18, voltage: 398 },
    { time: '12:00', temp: 48, voltage: 415 },
    { time: '18:00', temp: 35, voltage: 410 },
    { time: '24:00', temp: 20, voltage: 399 }
  ];

  const sitePerformanceData = [
    { site: 'Site A', efficiency: 92.4 },
    { site: 'Site B', efficiency: 88.7 },
    { site: 'Site C', efficiency: 95.1 }
  ];

  const anomalies = [
    { id: 1, type: 'String Degradation', probability: 87, severity: 'high' },
    { id: 2, type: 'Inverter Drift', probability: 62, severity: 'medium' },
    { id: 3, type: 'Temperature Anomaly', probability: 45, severity: 'low' }
  ];

  const sparklineData = [
    { v: 12 }, { v: 19 }, { v: 8 }, { v: 22 }, { v: 15 }
  ];

  const menuItems = [
    { icon: Activity, label: 'Dashboard', active: true },
    { icon: MapPin, label: 'Sites' },
    { icon: AlertCircle, label: 'Alerts' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: FileText, label: 'Reports' },
    { icon: Settings, label: 'Settings' }
  ];

  const theme = {
    bg: isDark ? 'bg-slate-950' : 'bg-slate-50',
    card: isDark ? 'bg-slate-900' : 'bg-white',
    text: isDark ? 'text-slate-100' : 'text-slate-900',
    subtext: isDark ? 'text-slate-400' : 'text-slate-600',
    border: isDark ? 'border-slate-800' : 'border-slate-200',
    hover: isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
  };

  const KPICard = ({ icon: Icon, label, value, trend, unit, sparkdata }) => (
    <div className={`${theme.card} rounded-xl p-6 border ${theme.border} transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className={`${theme.subtext} text-sm font-medium`}>{label}</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {value}
            </span>
            <span className={`${theme.subtext} text-xs`}>{unit}</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={trend > 0 ? 'text-green-500' : 'text-red-500'} style={{ fontSize: '0.75rem' }}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        </div>
        <ResponsiveContainer width="40%" height={30}>
          <LineChart data={sparkdata}>
            <Line type="monotone" dataKey="v" stroke="#06b6d4" dot={false} strokeWidth={2} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const AlertItem = ({ alert }) => {
    const typeColors = {
      critical: { bg: isDark ? 'bg-red-500/10' : 'bg-red-100', border: 'border-red-500/30', icon: 'text-red-500' },
      warning: { bg: isDark ? 'bg-orange-500/10' : 'bg-orange-100', border: 'border-orange-500/30', icon: 'text-orange-500' },
      info: { bg: isDark ? 'bg-blue-500/10' : 'bg-blue-100', border: 'border-blue-500/30', icon: 'text-blue-500' }
    };
    const colors = typeColors[alert.type];

    return (
      <div className={`${colors.bg} border ${colors.border} rounded-lg p-4 mb-3 transition-all duration-200 hover:shadow-md`}>
        <div className="flex gap-3">
          <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.icon}`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className={`font-semibold text-sm ${theme.text}`}>{alert.title}</h4>
                <p className={`${theme.subtext} text-xs mt-1`}>{alert.desc}</p>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className={`${theme.subtext}`}>{alert.site}</span>
                  <span className={`${theme.subtext}`}>{alert.time}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert.status === 'open' ? 'bg-red-500/20 text-red-400' :
                  alert.status === 'acknowledged' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {alert.status}
                </span>
                <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AnomalyItem = ({ anomaly }) => (
    <div className={`${theme.card} border ${theme.border} rounded-lg p-4 mb-2 transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`font-medium text-sm ${theme.text}`}>{anomaly.type}</span>
        <span className={`text-sm font-bold ${
          anomaly.severity === 'high' ? 'text-red-400' :
          anomaly.severity === 'medium' ? 'text-orange-400' :
          'text-yellow-400'
        }`}>
          {anomaly.probability}%
        </span>
      </div>
      <div className={`w-full h-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            anomaly.severity === 'high' ? 'bg-gradient-to-r from-red-500 to-red-400' :
            anomaly.severity === 'medium' ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
            'bg-gradient-to-r from-yellow-500 to-yellow-400'
          }`}
          style={{ width: `${anomaly.probability}%` }}
        />
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${theme.card} border ${theme.border} rounded-lg p-2 shadow-lg`}>
          <p className={`${theme.text} text-xs font-semibold`}>{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${theme.bg} min-h-screen transition-colors duration-300`}>
      {/* Header */}
      <div className={`${theme.card} border-b ${theme.border} sticky top-0 z-40 backdrop-blur`}>
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`${theme.hover} p-2 rounded-lg transition-colors`}>
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Solvantis
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-xs mx-12">
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'} border ${theme.border}`}>
                <Search className="w-4 h-4 text-slate-500" />
                <select
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className={`bg-transparent text-sm outline-none flex-1 ${theme.text} cursor-pointer`}
                >
                  <option>Site A</option>
                  <option>Site B</option>
                  <option>Site C</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className={`relative p-2 rounded-lg ${theme.hover} transition-colors group`}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="absolute -top-8 right-0 px-2 py-1 rounded text-xs font-semibold bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {activeAlerts.filter(a => a.status === 'open').length} Active
                </span>
              </button>

              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg ${theme.hover} transition-colors`}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" />
              </button>

              <button className={`w-9 h-9 rounded-lg ${isDark ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-purple-500'} flex items-center justify-center text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all`}>
                JD
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
          <div className={`${theme.card} border-r ${theme.border} min-h-screen p-6 space-y-2`}>
            {menuItems.map((item, i) => (
              <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                item.active
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30'
                  : theme.hover
              }`}>
                <item.icon className={`w-5 h-5 ${item.active ? 'text-blue-400' : theme.subtext}`} />
                <span className={`text-sm font-medium ${item.active ? 'text-blue-400' : theme.text}`}>{item.label}</span>
                {item.active && <ChevronRight className="w-4 h-4 ml-auto text-blue-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 space-y-8 max-w-8xl mx-auto w-full">
          {/* KPI Section */}
          <div>
            <h2 className={`text-xl font-bold ${theme.text} mb-4`}>Live Monitoring</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                icon={Zap}
                label="Current Power"
                value="385"
                unit="kW"
                trend={12}
                sparkdata={sparklineData}
              />
              <KPICard
                icon={Sun}
                label="Today Production"
                value="8,420"
                unit="kWh"
                trend={8}
                sparkdata={sparklineData}
              />
              <KPICard
                icon={Activity}
                label="Performance Ratio"
                value="94.2"
                unit="%"
                trend={-2}
                sparkdata={sparklineData}
              />
              <KPICard
                icon={AlertCircle}
                label="Active Alerts"
                value={activeAlerts.filter(a => a.status === 'open').length}
                unit=""
                trend={5}
                sparkdata={sparklineData}
              />
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Real-time Power */}
            <div className={`lg:col-span-2 ${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
              <div className="mb-6">
                <h3 className={`text-lg font-bold ${theme.text}`}>Real-Time Power Output</h3>
                <p className={`${theme.subtext} text-sm mt-1`}>Last 24 hours</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={realtimePowerData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                  <XAxis dataKey="time" stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
                  <YAxis stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="power" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorPower)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Temp & Voltage */}
            <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
              <div className="mb-6">
                <h3 className={`text-lg font-bold ${theme.text}`}>Environmental Data</h3>
                <p className={`${theme.subtext} text-sm mt-1`}>Temperature & Voltage</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={tempVoltageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                  <XAxis dataKey="time" stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
                  <YAxis stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="temp" fill="#f97316" opacity={0.7} />
                  <Line type="monotone" dataKey="voltage" stroke="#8b5cf6" strokeWidth={2} yAxisId="right" />
                  <YAxis yAxisId="right" orientation="right" stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Production & Benchmarking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
              <div className="mb-6">
                <h3 className={`text-lg font-bold ${theme.text}`}>Weekly Production</h3>
                <p className={`${theme.subtext} text-sm mt-1`}>Daily output in kWh</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyProductionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                  <XAxis dataKey="day" stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
                  <YAxis stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="production" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
              <div className="mb-6">
                <h3 className={`text-lg font-bold ${theme.text}`}>Site Performance</h3>
                <p className={`${theme.subtext} text-sm mt-1`}>Efficiency comparison</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sitePerformanceData} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                  <XAxis type="number" stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
                  <YAxis dataKey="site" type="category" stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="efficiency" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alerts & Anomalies */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 ${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className={`text-lg font-bold ${theme.text}`}>System Alerts</h3>
                  <p className={`${theme.subtext} text-sm mt-1`}>Real-time monitoring</p>
                </div>
                <span className="text-sm font-semibold text-blue-400">{activeAlerts.length} Total</span>
              </div>
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {activeAlerts.map(alert => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </div>

            <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  <h3 className={`text-lg font-bold ${theme.text}`}>AI Status</h3>
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isDark ? 'bg-green-500/10' : 'bg-green-100'} border border-green-500/30`}>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-green-400">Healthy</span>
                </div>
              </div>

              <div>
                <h4 className={`text-sm font-semibold ${theme.text} mb-4`}>Detected Anomalies</h4>
                {anomalies.map(anomaly => (
                  <AnomalyItem key={anomaly.id} anomaly={anomaly} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? '#475569' : '#cbd5e1'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? '#64748b' : '#94a3b8'};
        }
      `}</style>
    </div>
  );
};

export default Solvantis;
