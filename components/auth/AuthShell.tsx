"use client"

import Image from "next/image"
import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AuthShellProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

const AuthShell = ({ title, subtitle, children, footer }: AuthShellProps) => {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] py-14 sm:py-20">
      {/* Background glows */}
      <div className="absolute top-10 -left-32 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-md px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-[#141414] p-7 shadow-2xl shadow-black/40 sm:p-9"
        >
          {/* Logo */}
          <div className="mb-7 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="GearOra"
              width={1851}
              height={560}
              priority
              className="h-9 w-auto"
            />
          </div>

          <div className="mb-7 text-center">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
          </div>

          {children}

          {footer && (
            <div className="mt-6 text-center text-sm text-gray-400">
              {footer}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export { AuthShell }
