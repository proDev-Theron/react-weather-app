import React from 'react'

const Container = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <div className='w-2/6 border-2 rounded-2xl p-6'>
            {children}
        </div>
    )
}

export default Container
