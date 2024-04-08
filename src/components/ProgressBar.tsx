const ProgressBar = ({ progress }: { progress: number }) => {
    return (

        <div className=" flex justiify justify center p-2 progress-bar-container">
            <progress className="progress progress-secondary text-500-blue " value={progress} max="100"></progress>
        </div>
    );
};

export default ProgressBar;
