import React, { useState } from 'react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [activeTab, setActiveTab] = useState('会员直播') // 添加tab状态管理

  // 置顶权益数据
  const topRights = [
    { name: '金字塔', icon: '⚡' },
    { name: '金字塔', icon: '⚡' },
    { name: '金字塔', icon: '⚡' },
    { name: '金字塔', icon: '⚡' }
  ]

  // 主要功能模块数据
  const tabContent = {
    '会员直播': {
      items: [
        '文字直播',
        '文字直播文字直...',
        '文字直播',
        '视频直播',
        '视频直播视频直...',
        '视频直播'
      ]
    },
    '独家观点': {
      items: [
        '专题观点',
        '专题观点专题观...',
        '专题观点',
        '栏目观点',
        '栏目观点',
        '栏目观点'
      ]
    },
    '大咖课程': {
      items: [
        '课程',
        '课程',
        '课程',
        '高级课程',
        '专业课程',
        '实战课程'
      ]
    },
    '智投工具': {
      items: [
        '投资分析',
        '风险评估',
        '收益预测',
        '资产配置',
        '量化策略',
        '市场监控'
      ]
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="app">
      {/* 主标题 */}
      <div className="main-header">
        <h1 className="app-title">超级投资家</h1>
      </div>

      {/* 用户信息区域 */}
      <div className="user-section">
        <div className="user-info">
          <div className="user-avatar">
            <span className="user-name">好**项</span>
          </div>
          <div className="user-details">
            <span className="expire-info">将于2025.03.03过期</span>
          </div>
        </div>
        <div className="diamond-container">
          <div className="diamond-logo">
            <div className="diamond-inner">V4</div>
          </div>
        </div>
      </div>

      {/* 置顶权益 */}
      <div className="top-rights-section">
        <div className="section-header">
          <div className="section-title-wrapper">
            <span className="heart-icon">♥</span>
            <span className="section-title">置顶权益</span>
            <span className="section-subtitle">可查看4个常用权益</span>
          </div>
          <button className="manage-btn">管理</button>
        </div>
        
        <div className="rights-grid">
          {topRights.map((item, index) => (
            <div key={index} className="right-item">
              <div className="pyramid-icon">{item.icon}</div>
              <span className="right-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 主功能导航 */}
      <div className="main-nav">
        {Object.keys(tabContent).map((tabName) => (
          <div 
            key={tabName}
            className={`nav-item ${activeTab === tabName ? 'active' : ''}`}
            onClick={() => handleTabClick(tabName)}
          >
            {tabName}
          </div>
        ))}
      </div>

      {/* 当前选中tab的内容 */}
      <div className="content-sections">
        <div className="content-section">
          <h3 className="content-title">{activeTab}</h3>
          <div className="content-grid">
            {tabContent[activeTab as keyof typeof tabContent].items.map((item, itemIndex) => (
              <div key={itemIndex} className="content-item">
                <div className="item-content">
                  <span className="item-text">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
