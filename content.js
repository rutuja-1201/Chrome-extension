
const miniRhymes = {
   
    "Coronavirus": "In the pandemic's midst, a virus spread contagious.",
    "Politics": "In the realm of power, where politicians rage us."
 
  };
  

  function replaceHeadlines() {
 
    const headlineElements = document.querySelectorAll(".title, .story-card-news .story-card-news-heading");
  
    headlineElements.forEach((element) => {
      const originalText = element.textContent.trim();
      const rhyme = miniRhymes[originalText];
  
      if (rhyme) {
        element.textContent = rhyme;
      }
    });
  }
  

  replaceHeadlines();
  
  
  const observer = new MutationObserver(() => {
    replaceHeadlines();
  });
  

  const targetNode = document.body;

  const config = { childList: true, subtree: true };

  observer.observe(targetNode, config);
  