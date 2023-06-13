

function App() {
  const image = {
    iamgeUrl: 'https://yt3.googleusercontent.com/584JjRp5QMuKbyduM_2k5RlXFqHJtQ0qLIPZpwbUjMJmgzZngHcam5JMuZQxyzGMV5ljwJRl0Q=s176-c-k-c0x00ffffff-no-rj',
    imageSize: 220,
  }
  
  return (
    <div className="App">
      <h1>Welcome to my app</h1>
      <img
        src = {image.iamgeUrl}
        style={{
            width: image.imageSize,
            height: image.imageSize
         }}
         
      />
    </div>
  );
}

export default App;
