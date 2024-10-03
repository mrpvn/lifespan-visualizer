import Link from 'next/link'
import React from 'react'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="text-center text-gray-400 mt-8">
          <p className="mb-4">Made by Praveen Singh</p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="https://x.com/mrpvnx" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-blue-400 hover:underline"
            >
              <FaXTwitter className="w-5 h-5 mr-1" />
              @mrpvnx
            </Link>
            <a 
              href="https://github.com/mrpvn" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-blue-400 hover:underline"
            >
              <FaGithub className="w-5 h-5 mr-1" />
              @mrpvn
            </a>
          </div>
      </footer>
  )
}

export default Footer