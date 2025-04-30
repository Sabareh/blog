import { NextSeo } from 'next-seo'
import Container from '@/components/Container'

export default function Terms() {
  return (
    <Container>
      <NextSeo
        title="Terms of Service – Parth Desai"
        description="Terms of Service for sabare.me"
        canonical="https://sabare.me/terms"
        openGraph={{
          url: 'https://sabare.me/terms',
          title: 'Terms of Service – Parth Desai',
          description: 'Terms of Service for sabare.me',
        }}
      />
      <article className="mx-auto mb-16 flex w-full max-w-2xl flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          Terms of Service
        </h1>
        <div className="prose w-full dark:prose-dark">
          <p className="text-gray-600 dark:text-gray-400">Last updated: July 30, 2022</p>

          <h2 id="agreement">1. AGREEMENT TO TERMS</h2>
          <p>
            These Terms of Use constitute a legally binding agreement made between you, whether
            personally or on behalf of an entity ("you") and Parth Desai ("Company," "we," "us," or
            "our"), concerning your access to and use of the{' '}
            <a href="https://sabare.me/" target="_blank" rel="noopener noreferrer">
              https://sabare.me/
            </a>{' '}
            website as well as any other media form, media channel, mobile website or mobile
            application related, linked, or otherwise connected thereto (collectively, the "Site").
          </p>

          {/* Add the rest of your terms of service content here */}
          {/* You can structure each section with proper h2, h3, p tags */}

          <h2 id="contact">25. CONTACT US</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
            {/* Add your contact information here */}
          </p>
        </div>
      </article>
    </Container>
  )
}
