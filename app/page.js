'use client';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { ArrowRight, BarChart3, Clock, Mic, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useUser } from './provider';


export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <header className="border-b w-full">
        <div className=" px-10 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={'/logo.png'} alt="logo" width={70} height={150} />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:underline"
            >
              How It Works
            </Link>
          </nav>
          <div>
            {user ? (
              <Link href={'/dashboard'}>
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <Link href={'/auth'}>
                <Button>Login</Button>
              </Link>
            )}
            {/* } */}
          </div>
        </div>
      </header>

      <main className="flex-1 items-center justify-center">
        {/* Hero Section */}
        <section className="py-20 flex items-center justify-center w-full md:py-28 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    AI-Powered{' '}
                    <span className="text-primary"> Interview Assistant </span>{' '}
                    for Modern Recruiters
                  </h1>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Let our AI voice agent conduct candidate interviews while
                    you focus on finding the perfect match. Save time, reduce
                    bias, and improve your hiring process.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {user ? (
                    <Link href={'/dashboard'}>
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-blue-700"
                      >
                        Create Interview <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href={'/auth'}>
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-blue-700"
                      >
                        Create Interview <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {/* <section
          id="features"
          className="py-16 md:py-24 flex items-center justify-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Make your hiring process easier.
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
                  VoiceHireAI saves your time by screening best suited candidates for you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Clock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Save Time</h3>
                <p className="text-center text-gray-500">
                  Automate initial screening interviews and focus on final
                  candidates.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart3 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Data-Driven Insights</h3>
                <p className="text-center text-gray-500">
                  Get detailed analytics and candidate comparisons based on
                  interview responses.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Reduce Bias</h3>
                <p className="text-center text-gray-500">
                  Standardized interviews help eliminate unconscious bias in the
                  hiring process.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="flex items-center justify-center py-16 md:py-24 bg-gray-50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  How VoiceHireAI Works
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
                  Three simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Create Interview</h3>
                <p className="text-center text-gray-500">
                  Set up your job requirements and get interview questions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Share with Candidates</h3>
                <p className="text-center text-gray-500">
                  Send interview links to candidates
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Review Results</h3>
                <p className="text-center text-gray-500">
                  Get AI-generated performance analysis
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="py-16 flex items-center justify-center md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Transform Your Hiring Process?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
                  Join hundreds of companies already using AiCruiter to find the
                  best talent.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-primary hover:bg-blue-700">
                  Get Started for Free
                </Button>
                <Button size="lg" variant="outline">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      {/* Footer */}
      <footer className="border-t flex items-center justify-center bg-gray-50">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Mic className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">VoiceHireAI</span>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <Link href="#" className="text-sm hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Contact
            </Link>
          </nav>
          <div className="text-sm text-gray-500">
            © 2025 VoiceHireAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
