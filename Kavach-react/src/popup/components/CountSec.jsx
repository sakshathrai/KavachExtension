import React from 'react'
import ProgressBar from "../components/progress";
// English Array
const english_array = ["Kavach", "Home", "Analysis", "Customize", "Scan", "Dark Pattern", 
                 "Urgency", "Scarcity", "Misdirection", "Social Proof", 
                 "Obstruction", "Sneaking", "Forced Action", "© 2024 Kavach. All rights reserved.", 
                 "Privacy", "Terms"]

// Hindi Array
const hindi_array = ["कवच", "घर", "विश्लेषण", "कस्टमाइज़", "स्कैन", "डार्क पैटर्न", 
               "अनावश्यकता", "दुर्लभता", "गुमराही", "सामाजिक सिद्धांत", 
               "अवरोध", "छुपा रहना", "मजबूर क्रिया", "© 2024 कवच। सभी अधिकार सुरक्षित।", 
               "गोपनीयता", "शर्तें"]

// Kannada Array
const kannada_array = ["ಕವಾಚ್", "ಹೋಮ್", "ವಿಶ್ಲೇಷಣೆ", "ಕಸ್ಟಮೈಸ್", "ಸ್ಕ್ಯಾನ್", "ಡಾರ್ಕ್ ಪ್ಯಾಟರ್ನ್", 
                 "ಅತ್ಯಾವಶ್ಯಕತೆ", "ಕಡಿಮೆಹೊಂದಿಸಿ", "ಮೋಸ", "ಸಾಮಾಜಿಕ ಪ್ರಮಾಣ", 
                 "ಅಡ್ಡಗೋಡೆ", "ಚುಚ್ಚಲು", "ಕಡಿಮೆ ಕ್ರಿಯೆ", "© 2024 ಕವಾಚ್. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿ.", 
                 "ಗೌಪ್ಯತೆ", "ಶರತ್ಗಳು"]
const darkPatterns = [
    'Urgency',
    'Scarcity',
    'Misdirection',
    'Social Proof',
    'Obstruction',
    'Sneaking',
    'Forced Action'
  ];
  
function CountSec() {
  return (
    <section className="py-2 sm:py-4 bg-gray-900 flex-1">
    <div className="container mx-auto px-4">
      <h2 className="text-sm sm:text-lg font-bold text-white mb-2 sm:mb-4">Dark Pattern</h2>
  
      <div className="grid grid-cols-2 gap-4">
        {darkPatterns.map((pattern, index) => (
          <div key={index} className="dark-pattern mb-2 p-2 w-full sm:w-auto sm:flex-shrink-0 border border-gray-700 rounded-md">
            <h3 className="text-xs sm:text-sm font-semibold mb-1 text-white">{pattern}</h3>
            <div className="flex items-center justify-between">
              <ProgressBar progVal={10} />
              <p className="text-gray-600 text-xxs sm:text-xs">3</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default CountSec