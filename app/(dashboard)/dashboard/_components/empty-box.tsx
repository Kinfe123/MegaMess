import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { Button } from "@/components/ui/button"

const EmptyBox = () => {
    return (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No FILE created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any content yet. Start creating content.
          </EmptyPlaceholder.Description>
          <Button variant="outline">Fake button</Button>
        </EmptyPlaceholder>

    )
}
export default EmptyBox 