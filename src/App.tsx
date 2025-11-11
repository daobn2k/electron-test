import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BaseRequest from './services.ts/base-request.service'

interface Provider {
  id: number
  name: string
  providerName: string
  emails: string[]
  whatsapp: string | null
  zaloId: string | null
  zaloGroupUrl: string | null
  sendVia: string
  services: string[]
  emailReceiveRequestPrice: string
  metadata: any
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  data: Provider[]
  total: number
  page: number
  limit: number
}

export default function App(){
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProviders = async () => {
    const request = new BaseRequest();

    const res = await request.get('/providers', {
      page: 1,
      limit: 50,
      sortBy: 'createdAt',
      order: 'desc'
    }) 

    console.log(res,'res');
    setProviders(res.data.data || [])
  }

  useEffect(() => {
    fetchProviders()
  }, [])

  return (
    <div style={{fontFamily: 'sans-serif', padding: 20}}>
      <h1>Providers Dashboard</h1>
      
      <button 
        onClick={fetchProviders}
        style={{
          marginBottom: 20,
          padding: '10px 20px',
          backgroundColor: '#007ACC',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer'
        }}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Refresh Providers'}
      </button>

      {error && (
        <div style={{
          color: 'red',
          backgroundColor: '#ffebee',
          padding: 10,
          borderRadius: 5,
          marginBottom: 20
        }}>
          Error: {error}
        </div>
      )}

      {loading && (
        <div style={{textAlign: 'center', padding: 20}}>
          Loading providers...
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: 20
      }}>
        {providers.map((provider) => (
          <div key={provider.id} style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 16,
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{marginBottom: 12}}>
              <h3 style={{margin: '0 0 8px 0', color: '#333'}}>{provider.providerName}</h3>
              <div style={{fontSize: 12, color: '#666'}}>ID: {provider.id}</div>
            </div>

            <div style={{marginBottom: 12}}>
              <strong style={{fontSize: 14, color: '#333'}}>Contact Info:</strong>
              
              {provider.emails && provider.emails.length > 0 && (
                <div style={{margin: '4px 0', fontSize: 13, color: '#555'}}>
                  📧 Emails: {provider.emails.join(', ')}
                </div>
              )}

              {provider.whatsapp && (
                <div style={{margin: '4px 0', fontSize: 13, color: '#555'}}>
                  📱 WhatsApp: {provider.whatsapp}
                </div>
              )}

              {provider.zaloId && (
                <div style={{margin: '4px 0', fontSize: 13, color: '#555'}}>
                  📲 Zalo ID: {provider.zaloId}
                </div>
              )}

              {provider.zaloGroupUrl && (
                <div style={{margin: '4px 0', fontSize: 13, color: '#555'}}>
                  � <a href={provider.zaloGroupUrl} target="_blank" rel="noopener noreferrer" style={{color: '#1976d2'}}>
                    Zalo Group
                  </a>
                </div>
              )}
            </div>

            <div style={{marginBottom: 12}}>
              <div style={{margin: '4px 0', fontSize: 13, color: '#555'}}>
                � Send Via: <span style={{
                  backgroundColor: '#e8f5e8',
                  color: '#2e7d32',
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontSize: 11
                }}>{provider.sendVia}</span>
              </div>

              {provider.emailReceiveRequestPrice && (
                <div style={{margin: '4px 0', fontSize: 13, color: '#555'}}>
                  💰 Price Request Email: {provider.emailReceiveRequestPrice}
                </div>
              )}
            </div>

            {provider.services && provider.services.length > 0 && (
              <div style={{marginBottom: 12}}>
                <strong style={{fontSize: 13, color: '#333'}}>Services:</strong>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4}}>
                  {provider.services.map((service, index) => (
                    <span key={index} style={{
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      padding: '4px 12px',
                      borderRadius: 12,
                      fontSize: 12,
                      textTransform: 'capitalize'
                    }}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: '1px solid #eee',
              fontSize: 11,
              color: '#999'
            }}>
              <div>Created: {new Date(provider.createdAt).toLocaleDateString('vi-VN')}</div>
              <div>Updated: {new Date(provider.updatedAt).toLocaleDateString('vi-VN')}</div>
            </div>
          </div>
        ))}
      </div>

      {providers.length === 0 && !loading && !error && (
        <div style={{textAlign: 'center', padding: 40, color: '#666'}}>
          No providers found
        </div>
      )}
    </div>
  )
}
