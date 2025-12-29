


export function  ilikeu(getLikes, setLikes, toAdd, likeButton){

  const savedLikes = getLikes()
  if (!Array.isArray(savedLikes)) savedLikes = [];

  const isLiked = savedLikes.some((x) => x.like === toAdd.like)

  if(!isLiked){
    likeButton.style.color = 'red'
    savedLikes.push(toAdd)
    setLikes(savedLikes)
  }else {
        likeButton.style.color = ''
    const toRemove = savedLikes.filter((x) => x.like !== toAdd.like)
    savedLikes.pop(toRemove)
    setLikes(savedLikes)
  }
}