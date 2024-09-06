// app/components/EssayGenerator.tsx
import { useState } from 'react';
import { OpenAIService } from '../services/openai.service';

export const EssayGenerator = () => {
  const [topic, setTopic] = useState('');
  const [pages, setPages] = useState('1 page / 275 words');
  const [paperType, setPaperType] = useState('Essay');
  const [writerModel, setWriterModel] = useState('EduWriter Base Pro (Undetectable)');
  const [subjectArea, setSubjectArea] = useState('Literature & Language');
  const [instructions, setInstructions] = useState('');
  const [generatedEssay, setGeneratedEssay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await OpenAIService.generateEssay(topic, pages, paperType, writerModel, subjectArea, instructions);
      setGeneratedEssay(response);
      setShowPopup(true); // Show the pop-up after essay generation
    } catch (error: unknown) {
      console.error('Error generating essay:', error);
      if (error instanceof Error) {
        if (error.message === 'Unauthorized') {
          // Handle unauthorized error (e.g., redirect to login)
          console.error('Unauthorized. Please log in again.');
        } else {
          // Handle other errors
          console.error('An error occurred while generating the essay:', error.message);
        }
      } else {
        console.error('An unknown error occurred while generating the essay.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedEssay], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${topic.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">AI Essay Writer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Please write your topic here..."
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="pages" className="block text-sm font-medium text-gray-700">Number of Pages</label>
            <select
              id="pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>1 page / 275 words</option>
              <option>2 pages / 550 words</option>
              <option>3 pages / 825 words</option>
            </select>
          </div>
          <div>
            <label htmlFor="paperType" className="block text-sm font-medium text-gray-700">Type of Paper</label>
            <select
              id="paperType"
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>Essay</option>
              <option>Research Paper</option>
              <option>Term Paper</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="writerModel" className="block text-sm font-medium text-gray-700">AI Writer Model</label>
            <select
              id="writerModel"
              value={writerModel}
              onChange={(e) => setWriterModel(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>EduWriter Base Pro (Undetectable)</option>
              <option>EduWriter Advanced</option>
            </select>
          </div>
          <div>
            <label htmlFor="subjectArea" className="block text-sm font-medium text-gray-700">Subject Area</label>
            <select
              id="subjectArea"
              value={subjectArea}
              onChange={(e) => setSubjectArea(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>Literature & Language</option>
              <option>Science</option>
              <option>History</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Submit Detailed Paper Instructions</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={4}
            placeholder="Type your instructions here"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate AI Paper'}
        </button>
      </form>
      {generatedEssay && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Generated Essay</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="whitespace-pre-wrap">{generatedEssay}</p>
            </div>
          </div>
          <button
            onClick={() => {/* Implement download functionality */}}
            className="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Download Essay
          </button>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setShowPopup(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Essay Generated Successfully</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">Your essay has been generated and saved. You can now download it.</p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Download Essay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};