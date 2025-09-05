"use client";

import {
  Medal,
  CheckCircle,
  Users,
  Zap,
  ArrowRight,
  GithubIcon,
  XIcon,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-7xl text-center text-foreground mb-6 font-bold text-balance"
              >
                Focus on what matters
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-center text-muted-foreground max-w-2xl mb-12 text-pretty"
              >
                Collaborate , manage projects and attain your productivity goals
                using FlowFrame.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 h-auto bg-amber-600 hover:bg-amber-600/90 text-background"
                >
                  Sign Up
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 h-auto bg-transparent hover:outline-amber-600"
                >
                  Login
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Everything you need to stay organized
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Powerful features designed to streamline your workflow and boost
              team productivity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-8 text-center relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Smart Task Management
                  </h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Organize tasks and set deadline tracking that keeps your
                    team on schedule.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-amber-50/70 to-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-8 text-center relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <Users className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Team Collaboration
                  </h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Shared workspaces, keep everyone aligned and productive.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-8 text-center relative">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <Zap className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Lightning Fast
                  </h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">
                    Near instant sync and a responsive interface that works
                    seamlessly across all devices.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <footer className="bg-muted/50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  FlowFrame
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  The task management platform that adapts to your team&apos;s
                  unique workflow. From startups to enterprises, we help teams
                  achieve more.
                </p>
                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 hover:bg-amber-600 hover:text-white transition-colors"
                  >
                    <XIcon className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 hover:bg-amber-600 hover:text-white transition-colors"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 hover:bg-amber-600 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-border mt-12 pt-8 text-center text-muted-foreground"
          >
            <p>&copy; 2023 FlowFrame. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
