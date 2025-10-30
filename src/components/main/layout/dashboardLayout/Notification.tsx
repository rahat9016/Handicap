import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/useNotifications";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export default function Notification() {
  const { notifications, totalUnread, loadMore, loading, totalItems, markAsRead } = useNotifications();
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Fixed Intersection Observer with better timing
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const currentLoader = loaderRef.current;
      if (!currentLoader) {
        console.log('❌ Loader ref still not available after timeout');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          console.log('👀 Intersection observed:', 'Loading:', loading);
          
          if (entry.isIntersecting && !loading) {
            console.log('🚀 Loading more...');
            loadMore();
          }
        },
        { 
          threshold: 0.1,
          root: contentRef.current
        }
      );

      observer.observe(currentLoader);

      return () => {
        console.log('🧹 Cleaning up observer');
        observer.unobserve(currentLoader);
      };
    }, 300);

    return () => clearTimeout(timer);
  }, [isOpen, loading, loadMore]);


  const handleNotificationClick = useCallback(async (noteId: string, isAlreadyRead: boolean) => {
  if (!isAlreadyRead) {
    console.log('📝 Marking notification as read:', noteId);
    await markAsRead(noteId);
  }
}, [markAsRead]);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full bg-muted transition hover:bg-muted/80">
          <Bell className="h-6 w-6 text-black/70" />
          {totalUnread > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 min-w-[20px] flex items-center justify-center">
              {totalUnread > 99 ? '99+' : totalUnread}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        ref={contentRef}
        className="w-80 h-[80vh] overflow-y-auto"
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()} 
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {totalUnread > 0 && (
            <Badge variant="secondary" className="text-xs">
              {totalUnread} unread
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 && !loading && (
          <div className="flex justify-center py-4 text-sm text-muted-foreground">
            No notifications
          </div>
        )}

        {notifications.map((note, index) => (
          <div
            key={`${note.createdAt}-${index}`}
            onClick={() => handleNotificationClick(note.id.toString(), note.isRead)}
            className={`flex flex-col items-start hover:bg-accent border-b cursor-pointer p-3 mb-1 ${
              !note.isRead ? "bg-light/80 " : "bg-transparent"
            }`}
          >
            <div className="flex items-start gap-3 w-full">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border overflow-hidden flex-shrink-0">
                <Image
                  src={"/office-man.png"}
                  width={40}
                  height={40}
                  alt="profile picture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm text-muted-foreground line-clamp-2">
                  {note.message}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}

        {(notifications.length < totalItems || loading) && (
          <div
            ref={loaderRef}
            className="flex justify-center items-center py-4 text-sm text-gray-500 border-t"
            style={{ minHeight: '60px' }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                Loading more...
              </div>
            ) : (
              <div className="text-center">
                <div>Scroll to load more</div>
                <div className="text-xs text-gray-400 mt-1">
                  {notifications.length} of {totalItems} loaded
                </div>
              </div>
            )}
          </div>
        )}

        {!loading && notifications.length >= totalItems && notifications.length > 0 && (
          <div className="flex justify-center items-center py-3 text-xs text-gray-400 border-t">
            All notifications loaded ({notifications.length} total)
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
