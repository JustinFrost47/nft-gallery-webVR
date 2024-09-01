

interface ViewProps {
    view: boolean;
    setView: any;
    metadata: any;
}

const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&s"

export default function ViewNft({ view, setView, metadata }: ViewProps) {

    const handleClose = () => {
        setView(false)
    }

    console.log(metadata)

    return (
        <>
            {view && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-slate-800 p-6 rounded-lg shadow-lg w-10/12  h-5/6 overflow-scroll">
                        <button
                            className="absolute top-2 right-2 text-white hover:text-gray-700 bg-red-700 hover:bg-red-600 px-3 py-1 rounded-full"
                            onClick={handleClose}
                        >
                            x
                        </button>

                        <div className='text-2xl text-white text-center p-4 m-2'>{metadata.metadata.name}</div>
                        <div className=' min-h-96 flex flex-col items-center justify-center'><img className='max-w-full' src={metadata.metadata.image || defaultImage} alt=""  /></div>
                        <div className=' text-white text-center p-4 m-2'> {metadata.metadata.description}</div>
                    </div>

                </div>
            )}
        </>
    )
}
