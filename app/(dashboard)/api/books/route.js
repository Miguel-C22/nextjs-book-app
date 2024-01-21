import connectMongoDB from "@/libs/connectDB"
import Book from "@/models/schema"
import { NextResponse } from "next/server"
import { currentUser } from '@clerk/nextjs'

//************Route page for Getting, Deleting, and Saving books to MongoDB***************

export async function POST(request) { 
    const user  = await currentUser()
    const email = user.emailAddresses[0].emailAddress 
    const {title, author, image, description, boolean, bookId} = await request.json()
    await connectMongoDB()
    await Book.create({title, author, image, description, boolean, bookId, email })
    return NextResponse.json({message: "Book Created"}, {status: 201})

}


// export async function GET(){
//    await connectMongoDB()
//    const books = await Book.find()
//    return NextResponse.json({ books }) 
// }

export async function GET() {
    try {
      // Get the signed-in user's email from Clerk
      const user  = await currentUser()
      if (!user) {
        // User not authenticated, handle accordingly
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
      }
  
      const email = user.emailAddresses[0].emailAddress 

      // Connect to MongoDB and fetch books for the specific user
      await connectMongoDB();
      const books = await Book.find({ email });
  
      return NextResponse.json({ books });
    } catch (error) {
      console.error('Error fetching books:', error);
      return NextResponse.json({ message: 'Error fetching books' }, { status: 500 });
    }
  }

  //-----------This is getting the Id that mongoDB gives each saved item (findByIdAndDelete)-------
// export async function DELETE(request){
//     const bookId = request.nextUrl.searchParams.get("bookId")
//     await connectMongoDB()
//     await Book.findByIdAndDelete({bookId: bookId.toString()})
//     return NextResponse.json({ message: "Book deleted "}, { status: 200 })
// }


//--------------------This is getting finding the book id (findOneAndDelete) So you can find different items using the (findOneAndDelete)
export async function DELETE(request) {
    const bookId = request.nextUrl.searchParams.get("bookId");

    if (!bookId) {
        return NextResponse.json({ message: "BookId not provided" }, { status: 400 });
    }

    await connectMongoDB();

    // Assuming 'bookId' is the field in your schema corresponding to the bookId
    const result = await Book.findOneAndDelete({ bookId: bookId.toString() });

    if (!result) {
        return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Book deleted" }, { status: 200 });
}