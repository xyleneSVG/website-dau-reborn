import axios from 'axios'

interface PostData {
  gRecaptchaToken: string
}

export async function POST(req: Request) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set in environment variables.')
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Server configuration error',
        score: 0,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const postData: PostData = await req.json()
    const { gRecaptchaToken } = postData

    const formData = `secret=${secretKey}&response=${gRecaptchaToken}`

    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (response.data.success && response.data.score > 0.5) {
      console.log('ReCaptcha score:', response.data.score)
      return new Response(
        JSON.stringify({
          success: true,
          score: response.data.score,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    } else {
      console.error('ReCaptcha verification failed:', response.data)
      return new Response(
        JSON.stringify({
          success: false,
          error: 'ReCaptcha verification failed',
          score: 0,
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Error during ReCaptcha verification:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        score: 0,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
