
const fbUserId = '10229955743575450'
// const fbAccessToken = 'EAAJUAxErC3wBAOTlD78tdjqewoPDi1BxgrYCwdHiofoKjrE9r5djGBzOrfmJ4hYzfcDQXERi99KeqZBiEL1thdYnzJweQmWGMZB0v3Jv8PPZAuRinzbpVA4D4FbKHv4vRbTnsYMb61CGOpyWsvWIpWCLRDsymSyR8IhWYkGI54xBZBCZBszK7DfSZAvcJSdxsUl1YFgrweRcqvpn3jhc8sQALWhux8c63tZAGxzHiRZBYjHHj0BckANh'
const fbAccessToken = 'EAAJUAxErC3wBAG1DlyImOZB44PEvlyx5I92M8Y8bSaxPNwOcnvrqwHQMOFkoeavLs8tIgsR42QLeHa9oDW3NIHBH569r62OQUb6GWoXx3h6Pl7re5hc1wxm0UUEiXpkYAEtAl8ZBiZBd9dP5ZBkZBaxZAXa9d5tbKgdcziVyoOAZAITOAAKCWj2q5tHZAjHZCeqIZAZBd50OtHqf0UqD9bGxGn6K00ZBJGWp0kK4YeDsD010eWYdk5KdZBmCz'


// Fetch Facebook posts using the Graph API
fetch(`https://graph.facebook.com/${fbUserId}/posts?access_token=${fbAccessToken}`)
  .then(response=>response.json())
  .then(data => {
    const posts = data.data
    console.log(posts)
    const postsContainer = document.getElementById('facebook-posts-container')
    console.log(postsContainer)
    console.log(postsContainer)
    
    posts.forEach(post => {
      const postElement = document.createElement('div')
      postElement.classList.add('post')
      console.log(post)

      const fbPostMessage = document.createTextNode(post.message);
      postElement.appendChild(fbPostMessage)

      // const attachment = post.attachments.data[0];
      // const postImage = document.createElement('img');
      // postImage.src = attachment.media.image.src;
      // postElement.appendChild(postImage);


      if (post.attachments && post.attachments.data && post.attachments.data.length > 0) {
        const attachment = post.attachments.data[0];
        // if (attachment.type === 'photo' && attachment.media && attachment.media.image && attachment.media.image.src) {
        const postImage = document.createElement('img');
        postImage.src = attachment.media.image.src;
        postElement.appendChild(postImage);
        // }
      }

      postsContainer.appendChild(postElement)
      
    });
  })
  .catch(error => {
    console.error('Error fetching Facebook posts:', error);
  });


// https://graph.facebook.com/anant13u/posts?access_token=EAAJUAxErC3wBAOTlD78tdjqewoPDi1BxgrYCwdHiofoKjrE9r5djGBzOrfmJ4hYzfcDQXERi99KeqZBiEL1thdYnzJweQmWGMZB0v3Jv8PPZAuRinzbpVA4D4FbKHv4vRbTnsYMb61CGOpyWsvWIpWCLRDsymSyR8IhWYkGI54xBZBCZBszK7DfSZAvcJSdxsUl1YFgrweRcqvpn3jhc8sQALWhux8c63tZAGxzHiRZBYjHHj0BckANh
