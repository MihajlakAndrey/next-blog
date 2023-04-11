import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="text-center text-2xl">
      <h1 className="font-bold">404 - Page Not Found &#9785;</h1>
      <p>The page does not exist or has been moved</p>
      <Link className="border-b-2 text-blue-500" href="/">
        Home
      </Link>
    </div>
  )
}
