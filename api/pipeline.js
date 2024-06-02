class MyClassificationPipeline {
    static task = 'question-answering';
    static model = 'Xenova/distilbert-base-uncased-distilled-squad';
    static instance = null;
  
    static async getInstance() {
      if (this.instance === null) {
        // Dynamically import the Transformers.js library
        let { pipeline, env} = await import('@xenova/transformers');
  
        // NOTE: Uncomment this to change the cache directory
        // env.cacheDir = './.cache';
  
        this.instance = await pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad');
      }
  
      return this.instance;
    }
 
  }


  module.exports = MyClassificationPipeline;