import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchInputProps {
    placeholder?: string,
    searchValue?: string,
    onClick: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({
    placeholder = 'Input',
    searchValue,
    onClick,
    onChange
}: SearchInputProps) {
    return (
        <div className="flex w-full max-w-sm items-center gap-2">
            <Input placeholder={placeholder} value={searchValue} onChange={onChange}/>
            <Button
                type="submit"
                variant="outline"
                onClick={onClick}>
                🔍
            </Button>
        </div>
    )
}
