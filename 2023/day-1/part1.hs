import System.IO
import Data.Char (isDigit)
import Data.Array
import Data.Maybe (catMaybes)

main :: IO ()
main = do
    calibrations <- readFile "input.txt"
    let firstDigits = listArray (1, length (lines calibrations)) (map extractFirstDigit (lines calibrations))
    let lastDigits = listArray (1, length (lines calibrations)) (map extractLastDigit (lines calibrations))
    let concatenated = listArray (1, length (lines calibrations)) $ zipWith combineDigits (elems firstDigits) (elems lastDigits)
    let concatedSum = sum $ catMaybes $ elems concatenated
    print concatedSum

extractFirstDigit :: String -> Maybe Int
extractFirstDigit line = 
    case dropWhile (not . isDigit) line of
        ""    -> Nothing
        (notDigit:_) -> Just (read [notDigit])

extractLastDigit :: String -> Maybe Int
extractLastDigit = extractFirstDigit . reverse

combineDigits :: Maybe Int -> Maybe Int -> Maybe Int
combineDigits (Just x) (Just y) = Just (read(show x ++ show y))
combineDigits _ _ = Nothing
