## [Word Combo](https://wordcombo.francisudeji.dev) (WIP)

This game is heavily inspired by [Wordle](https://www.nytimes.com/games/wordle/index.html). If you don't know what that is, I suggest you check it out first

Secondly, this game is a work in progress, as suggested in the title so let's keep our expectations low for now.

### Summary

WordCombo (or SpellChain because naming things is hard) is a word game where you're given a **START** and **TARGET** word. Your goal, should you choose to accept it, is to swap a letter starting from the **START** word to form a new word until you've correctly swapped your way to the **TARGET** word.

For each iteration, any word you come up must be an english word and points will be allocated based on how many combinations it takes you reach the **TARGET** word.

### Example

If the **START** word is **COLD** and the **TARGET** word is **WARM**

Then the first word you must type is **COLD**

Your next possible word could be **COAL** or **MOLD**

As you can see, we swapped **D** with **A** to form **COAL** and we swapped **C** with **M** to form **MOLD**

And that's how you work your way up until you reach the **TARGET** word

### A few things to consider

As this is an MVP, a few rules might change in the nearest future. You can also consider this a road map:

- Moving from only allowing four-letter words to longer words to increase difficulty or do both progressively as the challenge gets harder
- Increasing difficulty by introducing a time limit for each word pair
- Allowing the user choose a **START** and a **TARGET** word (but but have equal number of letters for fairness)
- Showing statistics of the current play
- Saving the user's progress in a db or just local storage
- Ability to share stats with others
- Better UI, animations, progress indicator
- Optimizing the code (for example, switch from using objects to Map since it's better because of the constant addition and deletion of key-value pair)

### Contributing

Feel free to contribute by creating an issue if this interests you

### Hosting

Head on over to [WordCombo in the sub-domain of my website to play](https://wordcombo.francisudeji.dev)
