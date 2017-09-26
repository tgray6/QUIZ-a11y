# QUIZ-a11y
Nintendo-Quiz a11y accessibility

/*
1. First a11y error is on start screen button. The multiple layers of the css throws off axe.
   If you analyze the page at the right time (when the text is not visible, it will also pass)
   My color scheme passes when i click learn more and fill in my background and font color.

2. Had to add a fieldset and legend to the radio buttons to make it pass. And added a fieldset border of 0 above

3. On feedback page, images needed an alt text for mario and bowser. 

4. After Getting an error saying every ID needs to be unique, i noticed I was appending all my
   questions to the DOM instead of using html. I Changed to .html on #fullFeedBack and it resolved.

   NOTE:I then changed it back to how it was and was fine leaving the ids similar, since I coded
   the app to post all the questions and answers in the final review page. WIth .html, these
   questions/answers were not able to be viewed.

5. On final results page, the "CLICK FOR QUIZ REVIEW" background color on the button had to be changed.
   It was initially gray like the border of the gameboy to make it look more authentic, but changed
   it to black to pass accessibility test.
*/
