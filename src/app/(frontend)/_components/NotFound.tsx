'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-[#D9FAD9] p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30 text-center overflow-hidden">
      <h1 className="flex text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-extrabold">
        <span className="animate-outline-to-solid">4</span>
        <span className="animate-outline-to-solid animation-delay-300">0</span>
        <span className="animate-outline-to-solid animation-delay-600">4</span>
      </h1>
      <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[30px] font-medium mt-4 mb-4 text-gray-800">
        Oops! Halaman yang Anda cari tidak ditemukan.
      </p>
      <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-gray-600 max-w-md">
        Sepertinya Anda tersesat. Jangan khawatir, kami akan membantu Anda kembali ke jalur yang
        benar.
      </p>
      <button
        onClick={() => router.back()}
        className="mt-8 px-6 py-2 md:py-3 xl:px-8 rounded-full bg-[#00DB05] text-white font-semibold text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] shadow-lg hover:bg-opacity-90 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Kembali ke Halaman Sebelumnya
      </button>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#00DB05] to-transparent opacity-20 z-0"></div>
    </div>
  )
}
