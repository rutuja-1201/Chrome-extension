
const fetchRhymes = async (keyword) => {
  try {
    const response = await fetch(`https://api.datamuse.com/words?rel_rhy=${keyword}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Failed to fetch rhymes for ${keyword}`);
  } catch (error) {
    console.error(error);
    return [];
  }
};


const rhymeCache = {};

const replaceHeadlines = async () => {
  
  const headlineElements = document.querySelectorAll(".title, .story-card-news .story-card-news-heading");

  for (const element of headlineElements) {
    const originalText = element.textContent.trim();
    const keywords = originalText.split(' ');

    let rhymedText = originalText;
   
    for (const keyword of keywords) {
     
      if (!rhymeCache[keyword]) {
    
        const rhymes = await fetchRhymes(keyword);
        if (rhymes.length > 0) {
        
          rhymeCache[keyword] = rhymes;
        }
      }

      if (rhymeCache[keyword]) {
     
        const randomRhyme = rhymeCache[keyword][Math.floor(Math.random() * rhymeCache[keyword].length)].word;
        rhymedText = rhymedText.replace(keyword, randomRhyme);
      
      }
    }

    element.textContent = rhymedText;
  }

};


const toggleExtension = () => {
  if (extensionEnabled) {
    extensionEnabled = false;
    observer.disconnect();
   
  } else {
    extensionEnabled = true;
    observer.observe(targetNode, config);
    
  }
};


let extensionEnabled = true;

const observer = new MutationObserver(() => {
  if (extensionEnabled) {
    console.log("Mutation observed, updating headlines...");
    replaceHeadlines();
  }
});

const targetNode = document.body;
const config = { childList: true, subtree: true };


replaceHeadlines();
