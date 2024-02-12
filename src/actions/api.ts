'use server'
export async function fetchData() {
    let islodaing = true
    const res = await fetch("https://65c0bb89dc74300bce8ca2c4.mockapi.io/api/inspections", {
        next: {
            revalidate: 0
        }
    })
    const data = await res.json()
    islodaing = false
    return { data, islodaing }

}
export async function fetchDataById(id: any) {
    let islodaing = true
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        next: {
            revalidate: 0
        }
    })
    const res = await data.json()
    islodaing = false
    return { res, islodaing }

}
export async function addComment(formData: { get: (arg0: string) => any }) {
    const status = formData.get('status');
    const venue = formData.get('venue');
    console.log("data",status,venue)
    // const response = await fetch(`https://api.example.com/articles/${articleId}/comments`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ comment }),
    // });
    // const result = await response.json();
    // return result;
  }