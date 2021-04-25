module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3,
        features: {
          'custom-properties': false
        }
      }
    ]
    // [
    //   '@fullhuman/postcss-purgecss',
    //   {
    //     content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './framework/**/*.{js,jsx,ts,tsx}'],
    //     defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    //     // safelist: ['html', 'body'],
    //     safelist: {
    //       standard: ['html', 'body'],
    //       deep: [/carousel-root/, /rc-collapse/, /accordion/, /react-html5-camera-photo/, /react-tabs/],
    //       greedy: [/^carousel/, /^Toastify/]
    //     }
    //   }
    // ],
    // 'autoprefixer'
  ]
};

/*
https://purgecss.com/safelisting.html#patterns

const purgecss = new Purgecss({
    content: [], // content
    css: [], // css
    safelist: {
      standard: [/red$/],
      deep: [/blue$/],
      greedy: [/yellow$/]
    }
})
In the example, selectors ending with red such as .bg-red, 
selectors ending with blue as well as their children such as blue p or .bg-blue .child-of-bg, 
and selectors that have any part ending with yellow such as button.bg-yellow.other-class, 
will be left in the final CSS.
*/
