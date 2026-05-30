import React from 'react';
import { FaFileArchive, FaTrashAlt, FaFolderMinus, FaBan } from 'react-icons/fa';

export default function TrashCan({ onShowToast }) {
  const deletedFiles = [
    { name: "Distraction.dmg", date: "May 29, 2026 at 9:48 PM", size: "48 MB", kind: "Disk Image", type: "installer" },
    { name: "Laziness.app", date: "May 28, 2026 at 3:15 PM", size: "1.2 GB", kind: "Application", type: "app" },
    { name: "Procrastination.zip", date: "May 27, 2026 at 11:20 AM", size: "750 MB", kind: "ZIP Archive", type: "archive" },
    { name: "Imposter_Syndrome.pkg", date: "May 26, 2026 at 6:42 PM", size: "82 MB", kind: "Installer Package", type: "package" },
    { name: "Self_Doubt.exe", date: "May 25, 2026 at 8:05 AM", size: "15 MB", kind: "Windows Executable", type: "binary" }
  ];

  const handleFileClick = (fileName) => {
    onShowToast(`'${fileName}' has been permanently deleted for good to maximize code performance! 🚀`);
  };

  return (
    <div className="space-y-4 select-none h-full flex flex-col justify-between">
      <div>
        {/* Recycle Bin Top Header */}
        <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center space-x-3 mb-4 select-none">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center shrink-0">
            <FaTrashAlt className="text-sm" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-textPrimary leading-tight">Trash Bin</h4>
            <p className="text-[10px] text-rose-400 font-mono">Deleted system logs &amp; performance blockers</p>
          </div>
        </div>

        {/* Tabular macOS list view */}
        <div className="overflow-x-auto border border-white/5 rounded-xl bg-[#0b0b10]">
          <table className="w-full text-left font-mono text-[11px] leading-relaxed border-collapse select-none">
            <thead>
              <tr className="bg-neutral-900/90 text-textSecondary uppercase tracking-wider text-[9px] border-b border-white/5">
                <th className="py-2.5 px-4 font-semibold">Name</th>
                <th className="py-2.5 px-3 font-semibold">Date Modified</th>
                <th className="py-2.5 px-3 font-semibold">Size</th>
                <th className="py-2.5 px-4 font-semibold text-right">Kind</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-textSecondary">
              {deletedFiles.map((file, idx) => (
                <tr 
                  key={idx}
                  onClick={() => handleFileClick(file.name)}
                  className="hover:bg-rose-500/5 hover:text-rose-400 cursor-pointer transition-colors"
                >
                  <td className="py-2 px-4 flex items-center space-x-2.5 font-sans font-semibold text-textPrimary group">
                    <span className="shrink-0 text-textMuted hover:text-rose-500">
                      {file.type === 'archive' ? <FaFileArchive className="text-xs" /> : <FaFolderMinus className="text-xs" />}
                    </span>
                    <span className="truncate max-w-[130px] sm:max-w-none">{file.name}</span>
                  </td>
                  <td className="py-2 px-3 text-textMuted truncate">{file.date}</td>
                  <td className="py-2 px-3 font-semibold">{file.size}</td>
                  <td className="py-2 px-4 text-right truncate text-textMuted">{file.kind}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center py-2 text-[9px] font-mono text-textMuted uppercase tracking-wider select-none">
        Empty Trash &bull; 0 blockers remaining
      </div>
    </div>
  );
}
