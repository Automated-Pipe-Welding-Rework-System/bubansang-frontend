/**
 * 페이지 1: AI 결함 분석 및 등록 (QC Portal)
 * 세련된 디자인으로 재구성
 */

import { useState } from 'react';

export default function QCPortal() {
  const [aiAnalysisComplete, setAiAnalysisComplete] = useState(false);
  const [formEnabled, setFormEnabled] = useState(false);

  const handleAIAnalysis = () => {
    setTimeout(() => {
      setAiAnalysisComplete(true);
      setFormEnabled(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-[1200px] mx-auto">
        {/* 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Register New Defect</h1>
          <p className="text-gray-500 text-base">QC Portal - AI-powered defect analysis</p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="space-y-10">
          {/* Section 1: Defect Identification */}
          <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center text-white font-bold">
                1
              </div>
              <h2 className="text-xl font-bold text-gray-900">Defect Identification</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pipe ID</label>
                <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>Search and select Pipe ID</option>
                  <option>PIPE-001</option>
                  <option>PIPE-002</option>
                  <option>PIPE-003</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location ID</label>
                <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>Search and select Work Zone</option>
                  <option>ZONE-B</option>
                  <option>ZONE-E</option>
                  <option>ZONE-F</option>
                  <option>ZONE-G</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">External Visual Testing (VT) Photo</label>
                <div className="h-40 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-gray-400 text-5xl mb-2">upload_file</span>
                    <p className="text-sm text-gray-500">Drag & drop or click</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Internal X-ray (RT) Photo</label>
                <div className="h-40 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-gray-400 text-5xl mb-2">upload_file</span>
                    <p className="text-sm text-gray-500">Drag & drop or click</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleAIAnalysis}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined">auto_awesome</span>
                Run AI Analysis
              </button>
            </div>
          </div>

          {/* Section 2: AI Analysis Results */}
          <div className={`bg-white rounded-lg p-10 shadow-sm border border-gray-100 transition-opacity ${!aiAnalysisComplete ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold">
                2
              </div>
              <h2 className="text-xl font-bold text-gray-900">AI Analysis Results</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Internal Severity (p_in)</label>
                <input
                  type="text"
                  readOnly
                  value={aiAnalysisComplete ? '1.8' : ''}
                  placeholder="Pending..."
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-100 text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">External Severity (p_out)</label>
                <input
                  type="text"
                  readOnly
                  value={aiAnalysisComplete ? '1.5' : ''}
                  placeholder="Pending..."
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-100 text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Defect Type (Estimated)</label>
                <input
                  type="text"
                  readOnly
                  value={aiAnalysisComplete ? 'Porosity' : ''}
                  placeholder="Pending..."
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-100 text-sm cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Rework Details */}
          <div className={`bg-white rounded-lg p-10 shadow-sm border border-gray-100 transition-opacity ${!formEnabled ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white font-bold">
                3
              </div>
              <h2 className="text-xl font-bold text-gray-900">Rework Details</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Required Skill</label>
                <select 
                  disabled={!formEnabled}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option>Select required skill</option>
                  <option>SMAW</option>
                  <option>GTAW</option>
                  <option>GMAW</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Setup Type</label>
                <select 
                  disabled={!formEnabled}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option>Select setup type</option>
                  <option>Standard Setup</option>
                  <option>Advanced Setup</option>
                  <option>Complex Setup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Time (min)</label>
                <input
                  type="number"
                  disabled={!formEnabled}
                  placeholder="e.g., 60"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              disabled={!formEnabled}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Register Defect
            </button>
            <button
              disabled={!formEnabled}
              className="px-8 py-3 bg-white border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate RFI/NCR Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
